// app/api/rss/route.js
import Parser from 'rss-parser';
import {NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";
import axios from 'axios';
import * as cheerio from 'cheerio';

const parser = new Parser();

export async function GET() {
    const rssUrl = 'https://www.mk.co.kr/rss/30100041/';
    const feed = await parser.parseURL(rssUrl);

    if(!feed) {
        console.error('Error parsing RSS Data, feed = ', feed);
        return NextResponse.json({});
    }

    const items = feed.items;

    for(let index in items) {
       await saveRSSData(items[index]);
    }

    console.log('complete scheduler!');

    return NextResponse.json(feed); // 피드에서 주요 항목만 클라이언트에 전달
}

/**
 * link, title, author, pubDate를 DB에 저장
 * @param feed
 */
async function saveRSSData(feed) {
    try {
        const news = await prisma.news.create({
            data: {
                link: feed.link,
                title: feed.title,
                content: feed.content,
                published_at: new Date(feed.pubDate)
            },
        });

        console.log('newsDetail finished!!!!')

        await saveNewsDetailData(feed.link, news.idx);

        return NextResponse.json({}, { status: 200 });

    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: 'news save failed' }, { status: 500 });

    }
}

/**
 * 링크로 기사본문을 가져와서 가공하여 DB에 저장
 * @param res
 */
async function saveNewsDetailData(link, idx) {
    if (!link) {
        return NextResponse.json({ error: 'No link provided' });
    }

    console.log('link ==> ', link, '   idx ==> ', idx)

    try {
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);

        // 본문 선택자를 사용해 원하는 영역만 가져옴
        let content = $('.news_cnt_detail_wrap').text();  // 본문 선택자에 맞게 변경

        // 불필요한 패턴 제거 (예: "사진 확대" 또는 기타 텍스트 패턴)
        content = content.replace(/사진 확대|금융가 톺아보기|관련 뉴스.*|\[사진 제공\s*=\s*[^\]]+\]/gs, ' ').replace(/\s+/g, ' ').trim();

        console.log('content ==> ', content)
        const analyzeInfo = await parseNewsByAI(content);


        console.log('analyzeInfo ==> ',analyzeInfo);
        // DB 저장
        const newsDetail = await prisma.news_detail.create({
            data: {
                news_idx: idx,
                summary: analyzeInfo.jsonArray[0].summary,
                words: JSON.stringify(analyzeInfo.jsonArray[0].words)
            },
        });

        console.log('newsDetail finished!!!!')

        return NextResponse.json({
            content: content,  // 텍스트 형태의 본문
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch article data' });
    }
}

/**
 * ChatGPT API를 통해 기사 분석
 * @param article
 */
async function parseNewsByAI(article) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                article: article
            }),
        });

        const data = await res.json(); // JSON 파싱
        return data;

    } catch (error) {
        console.error(error);
        return;
    }
}