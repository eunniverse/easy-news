import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const CheckWords = () => {
    return (
        <div className="border-0">
            <FaCheckCircle className="inline mr-2 mb-1.5"/>
            <h3 className="inline font-bold text-lg">단어를 체크해요</h3>
            <div></div>
        </div>
    );
};

export default CheckWords;