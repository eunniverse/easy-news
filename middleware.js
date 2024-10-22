import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// matcher로 특정 경로에 미들웨어를 적용합니다.
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
    console.log(token, '  ,', pathname);

    // 로그인이 필요한 페이지들에 대해 처리 (예: /dashboard 경로)
    if (pathname.startsWith('/dashboard')) {
        // 토큰이 없으면 로그인 페이지로 리다이렉트
        if (!token) {
            console.log('aaa')
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    }

    // 토큰이 있으면 요청을 그대로 진행
    return NextResponse.next();
}
