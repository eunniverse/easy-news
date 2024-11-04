'use client';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "@/app/components/Header";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Page = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCard, setActiveCard] = useState(null); // 클릭된 카드 추적
    const router = useRouter();

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        rows: 2,
        centerPadding: '20px',
        distinct: ['idx'],
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) {
                    throw new Error('Failed to fetch news data');
                }
                const data = await response.json();
                setCards(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleCardClick = (idx) => {
        setActiveCard(idx); // 클릭된 카드 설정
        setTimeout(() => {
            router.push(`/dashboard/${idx}`);
        }, 500); // 애니메이션이 끝난 후 페이지 이동
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <div className="container mx-auto px-2">
                    <div className="h-7 w-1/5 bg-gray-200 rounded mt-3 mb-3 pt-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="card-container">
                                <div className="card bg-white animate-pulse rounded-lg p-4 h-64">
                                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-1 w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-1 w-2/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="container w-full mx-auto px-3">
                <h3 className="text-2xl font-bold mb-3 pt-4 ml-dashboard-title">EASY NEWS Pick!</h3>
                <Slider {...settings} className="news-slider">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.idx}
                            layoutId={`card-${card.idx}`}
                            className="card-container cursor-pointer"
                            onClick={() => handleCardClick(card.idx)}
                        >
                            <div className="card bg-white shadow-lg rounded-lg p-4 border-2">
                                <h3 className="card-title text-lg font-semibold mb-2">{card.title}</h3>
                                <p className="card-content text-sm text-gray-700 mb-4 line-clamp-3">{card.content}</p>
                                <p className="card-date text-xs text-gray-500 text-right">{new Date(card.published_at).toLocaleString()}</p>
                            </div>
                        </motion.div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Page;
