import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// config 객체의 matcher 설정은 미들웨어 함수 내부에서 별도로 경로를 확인하지 않고도 특정 경로에만 미들웨어가 자동으로 작동하도록 해줌
export const config = {
    matcher: ['/dashboard/:path*'], // 대시보드와 그 하위 경로에만 적용
};

// 미들웨어 함수
export async function middleware(req) {
    console.log('Middleware is running for', req.url); // URL 로그 출력

    // JWT 토큰을 요청에서 추출 (NextAuth의 secret 키 필요)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // URL 객체를 생성해서 현재 경로 정보를 가져옴
    const { pathname } = req.nextUrl;

    // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    if (!token) {
        const signInUrl = new URL('/auth/signin', req.url);
        signInUrl.searchParams.set('error', 'not_authenticated');
        return NextResponse.redirect(signInUrl);
    }

    // 토큰이 있으면 요청을 그대로 진행
    return NextResponse.next();
}
