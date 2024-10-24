import React from 'react';
import { FaAlignLeft } from "react-icons/fa";

const Summary = () => {
    return (
        <div className="border-0">
            <FaAlignLeft className="inline mr-2 mb-1"/>
            <h3 className="inline font-bold text-lg">뉴스를 요약해요</h3>
            <div></div>
        </div>
    );
};

export default Summary;