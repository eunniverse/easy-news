import React from 'react';
import { TbHandFinger } from "react-icons/tb";

const EasyNewsPick = () => {
    return (
        <div className="border-0 flex justify-between items-center">
            <h3 className="text-xl font-bold">EASY NEWS Pick!</h3>
            <button className="bg-black text-white px-1.5 py-1.5 rounded text-xs flex items-center">
                <TbHandFinger className="inline mr-1.5 mb-0.5" />
                <span>내가 Pick한 뉴스로 보기</span>
            </button>
        </div>
    );
};

export default EasyNewsPick;