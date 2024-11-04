'use client';
import React, { useEffect, useState, Suspense } from 'react';
import EasyNewsPick from '@/app/easyNewsPick/page';
import Summary from '@/app/summary/page';
import CheckWords from '@/app/checkWords/page';
import Header from '@/app/components/Header';
import {useParams, usePathname} from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const Page = () => {
    const params = useParams(); // 동적 경로 파라미터 객체
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.idx) {
            // idx가 있을 때만 데이터 가져오기
            (async () => {
                try {
                    const response = await fetch(`/api/news/${params.idx}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch news data');
                    }

                    const data = await response.json();
                    setNewsData(data[0]);

                } catch (error) {
                    console.error('Error fetching news detail:', error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [params.idx]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4 flex-grow h-full">
                <h1 className="text-2xl font-bold mb-3">EASY NEWS Detail!</h1>
                <AnimatePresence mode="wait">
                    <motion.div
                        layoutId={`card-${params.idx}`}
                        className="container mx-auto p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {loading ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100vh-180px)] border rounded-md p-4 shadow-lg bg-white">
                                {/* EASY NEWS Pick! 스켈레톤 */}
                                <div className="bg-white border rounded-md p-4 shadow-lg flex flex-col h-full">
                                    <Skeleton height={200} />
                                </div>
                                <div className="flex flex-col gap-4 h-full">
                                    {/* 뉴스 요약 스켈레톤 */}
                                    <div className="bg-white border rounded-md p-4 shadow-lg flex items-center justify-center flex-grow">
                                        <Skeleton height={100} width={`100%`} />
                                    </div>
                                    {/* 단어 체크 스켈레톤 */}
                                    <div className="bg-white border rounded-md p-4 shadow-lg flex items-center justify-center flex-grow">
                                        <Skeleton height={100} width={`100%`} />
                                    </div>
                                </div>
                            </div>
                        ) : newsData ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100vh-180px)] border rounded-md p-4 shadow-lg bg-white">
                                {/* EASY NEWS Pick! 섹션 */}
                                <div className="bg-white border rounded-md p-4 shadow-lg flex flex-col h-full">
                                    <Suspense fallback={<div>Loading EASY NEWS Pick...</div>}>
                                        <EasyNewsPick newsData={newsData} />
                                    </Suspense>
                                </div>
                                <div className="flex flex-col gap-4 h-full">
                                    {/* 뉴스 요약 섹션 */}
                                    <div className="bg-white border rounded-md p-4 shadow-lg flex items-center justify-center flex-grow summary-height">
                                        <Suspense fallback={<div>Loading News Summary...</div>}>
                                            <Summary newsData={newsData} />
                                        </Suspense>
                                    </div>
                                    {/* 단어 체크 섹션 */}
                                    <div className="bg-white border rounded-md p-4 shadow-lg flex items-center justify-center flex-grow">
                                        <Suspense fallback={<div>Loading Check Words...</div>}>
                                            <CheckWords newsData={newsData} />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center min-h-screen">No data found</div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Page;
