import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
    try {
        // news 테이블에서 데이터 조회
        const newsData = await prisma.news.findMany({
            orderBy: {
                published_at: 'desc',
            },
            take: 40, // 원하는 데이터 수를 조정할 수 있음
        });

        return NextResponse.json(newsData);
    } catch (error) {
        console.error('Error fetching news data:', error);
        return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
    }
}
