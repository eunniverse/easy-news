import React, {useEffect, useState} from 'react';
import { FaCheckCircle } from "react-icons/fa";

const CheckWords = ({ newsData }) => {
    const [words, setWords] = useState([]);
    useEffect(() => {
        const wordsJSON = JSON.parse(newsData.words);
        setWords(wordsJSON);
    }, [newsData.words]);

    return (
        <div className="border-0 flex flex-col h-full w-full">
            <div className="flex items-center justify-start w-full">
                <FaCheckCircle className="inline mr-2" />
                <h3 className="font-bold text-lg w-full">단어를 체크해요</h3>
            </div>
            <div className="flex-grow overflow-y-auto check-word-table table-container">
                <table className="border-0 rounded-2xl mt-3 w-full h-full">
                    <tbody>
                    {words.map((word, index) => (
                        <React.Fragment key={index}>
                            <tr
                                className={`${
                                    index === 0 ? 'border-t-2 border-t-gray-300 mb-2' : 'border-t border-t-gray-200 mb-2'
                                }`}
                            >
                                <td className="font-medium">{word.word}</td>
                            </tr>
                            <tr
                                className={`${
                                    index === words.length - 1 ? 'border-b-2 border-b-gray-300' : 'border-b border-b-gray-200'
                                }`}
                            >
                                <td className="py-1 px-2 text-gray-600 text-xs">{`: ${word.define}`}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckWords;
