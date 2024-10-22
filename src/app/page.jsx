'use client';

import { useSession } from 'next-auth/react';
import SignInPage from './auth/signin/page'; // 로그인 페이지 컴포넌트 가져오기
import Dashboard from './dashboard/page';

export default function HomePage() {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        return (
            <div>
               <Dashboard/>
            </div>
        );
    }

    return (
        <div>
           <SignInPage/>
        </div>
    );
}
