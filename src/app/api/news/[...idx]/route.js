import { NextResponse } from 'next/server';
import { Kysely, sql } from 'kysely';
import db from "../../../../../lib/kysely";

export async function GET(req, { params }) {
    const { idx } = params; // Extracting idx from the route parameters

    try {
        // Fetch the news item based on the provided idx
        const newsItem = await db
            .selectFrom('News_detail')
            .innerJoin('News as news', 'news_idx', 'news.idx') // users 테이블과 orders 테이블을 user_id를 기준으로 조인
            .where('news_idx', '=', idx)
            .select([
                'summary',
                'words',
                'title',
                'content'
            ])
            .execute();

        if (!newsItem) {
            return NextResponse.json({ message: 'News item not found' }, { status: 404 });
        }

        return NextResponse.json(newsItem, { status: 200 });

    } catch (error) {
        console.error('Error fetching news item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
