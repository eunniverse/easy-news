import Groq from "groq-sdk";
import {NextResponse} from "next/server";
import extractJSON from 'extract-json-from-string';
const deepl = require('deepl-node');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

export async function POST(req) {
    try {
        const { article } = await req.json(); // 요청에서 article 추출
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "당신은 한국어로 기사를 요약하고 금융 분야의 신문 기사에서 사용된 기술적이고 고급스러운 어휘와 뜻을 JSON 형식의 한글로만 추출하는 도우미입니다." },
                {
                    content: `
                        제가 기사를 제공하겠습니다. 아래 기사 내용을 JSON 형식으로 요약하고, 금융 분야의 해당 기사에서 사용된 기술적이고 고급스러운 어휘 10개를 어려운 순서로 추출해 주세요. JSON 형식은 data: {summary: '기사 요약된 내용', words: [{word: '한글 단어', define:'한글로만 단어를 정의한 내용'}]}입니다. 각 단어의 의미는 한글로만 간결하게 설명해 주세요.
                        
                        기사 내용:
                        ${article}
                    `,
                    role: "user"
                }
            ],
            model: "llama3-8b-8192"
        });

        const jsonArray = extractJSON(completion.choices[0].message.content);
        return NextResponse.json({jsonArray}, { status: 200 });

        // FIXME 나중에 실제로 사용할 때 풀것 !!! 돈나감..
        // if(!Array.isArray(jsonArray)) {
        //     return NextResponse.json({jsonArray}, { status: 200 });
        // }
        // translateAndBuildJson(jsonArray).then(jsonRes => {
        //     console.log("번역된 JSON:", jsonRes);
        //     return NextResponse.json({jsonRes}, { status: 200 });
        // });

    } catch (e) {
        console.error(e);
        return NextResponse.json({}, { status: 500 });

    }
}

// 번역 함수
async function translateAndBuildJson(jsonArray) {
    const originalSummary = jsonArray[0].summary;
    const originalWords = jsonArray[0].words;
    let jsonRes;

    try {
        // summary 번역
        const translatedSummary = await translator.translateText(originalSummary, null, 'ko');

        // words 배열의 각 define 번역
        const translatedWords = await Promise.all(
            originalWords.map(async wordObj => {
                const translatedDefine = await translator.translateText(wordObj.define, null, 'ko');
                return { word: wordObj.word, define: translatedDefine };
            })
        );

        // 번역된 결과로 새로운 JSON 객체 생성
        jsonRes = {
            summary: translatedSummary,
            words: translatedWords
        };

    } catch (error) {
        console.error("번역 오류:", error);
        jsonRes = jsonArray;
    }

    console.log(JSON.stringify(jsonRes, null, 2))
    return jsonRes;
}

