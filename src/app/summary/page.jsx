import React, {useEffect, useState} from 'react';
import {FaAlignLeft} from "react-icons/fa";

const Summary = ({newsData}) => {
    const [summary, setSummary] = useState('');
    useEffect(() => {
        setSummary(newsData.summary)
    }, [newsData.summary]);

    return (
        <div className="border-0 flex flex-col h-full w-full">
            <div className="flex items-center justify-start w-full">
                <FaAlignLeft className="inline mr-2" />
                <h3 className="font-bold text-lg w-full">뉴스를 요약해요</h3>
            </div>
            <div className="flex-grow mt-5">
                <p className="text-gray-700 text-base leading-relaxed text-start">
                    {summary}
                </p>
            </div>
        </div>
    );
};

export default Summary;