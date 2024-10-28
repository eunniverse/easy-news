import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials'; // 경로 확인
import prisma from '../../../../../lib/prisma'; // Prisma 클라이언트
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                loginId: { label: 'loginId', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const { loginId, password } = credentials;

                // 사용자의 이메일로 데이터베이스에서 사용자 찾기
                const user = await prisma.user.findUnique({ where: { login_id: loginId } });

                if (!user) {
                    throw new Error('No user found with the given email');
                    return null;
                }

                // 비밀번호 검증
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error('Invalid credentials');
                    return null;
                }

                // 사용자 인증 성공 시 사용자 객체 반환
                return { loginId: user.loginId, name: user.name, email: user.email };
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    logger: {
        debug(code, metadata) {
            console.debug(metadata.error)
        }
    },
    pages: {
        signIn: '/auth/signin', // 로그인 페이지 경로
    },
    // JWT 설정
    session: {
        strategy: 'jwt', // JWT를 통해 세션 관리
    },
    // JWT 관리
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30, // 30일
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/dashboard`;
        },
        // JWT 생성 시 사용자 정보를 포함
        async jwt({ token, user }) {
            if (user) {
                // 처음 로그인할 때만 사용자 정보를 토큰에 추가
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        // 세션이 생성될 때 JWT 토큰 정보를 포함시킴
        async session({ session, token }) {
            console.debug('token = ', token, '  session = ', session)

            // 세션에 JWT에서 가져온 사용자 정보 추가
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
