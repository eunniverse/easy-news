import React, {useEffect, useState} from 'react';

const EasyNewsPick = ({newsData}) => {
    const [summary, setSummary] = useState('');
    useEffect(() => {
        console.log(newsData)
        setSummary(newsData.content)
    }, [newsData.summary]);

    return (
        <div>
            <div className="border-0 flex justify-between items-center">
                <h3 className="text-xl font-bold">EASY NEWS Pick!</h3>
            </div>
            <div className="flex-grow mt-5">
                <p className="text-gray-700 text-base leading-relaxed text-start">
                    {summary}
                </p>
            </div>
        </div>
    );
};

export default EasyNewsPick;