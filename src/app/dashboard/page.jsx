import React, {Suspense} from 'react';
import EasyNewsPick from "@/app/easyNewsPick/page";
import Summary from "@/app/summary/page";
import CheckWords from "@/app/checkWords/page";
import Header from "@/app/components/Header";

const Page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-3 mx-3 flex-grow">
                {/* EASY NEWS Pick! 섹션 */}
                <div className="row-span-2 col-span-2 bg-white border rounded-md p-4 h-full">
                    <Suspense fallback={<div>Loading EASY NEWS Pick...</div>}>
                        <EasyNewsPick />
                    </Suspense>
                </div>

                {/* 뉴스 요약 섹션 */}
                <div className="col-span-2 bg-white border rounded-md p-4 h-full">
                    <Suspense fallback={<div>Loading News Summary...</div>}>
                        <Summary />
                    </Suspense>
                </div>

                {/* 단어 체크 섹션 */}
                <div className="bg-white col-span-2 border rounded-md p-4 h-full">
                    <Suspense fallback={<div>Loading Check Words...</div>}>
                        <CheckWords />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Page;