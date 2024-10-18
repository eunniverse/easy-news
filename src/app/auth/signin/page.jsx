'use client';

import { signIn } from 'next-auth/react';
import Image from "next/image";
import React from "react";

export default function SignInPage() {
    return (
        <div>
            <div className="flex flex-col px-6 py-12 lg:px-8 justify-center items-center min-h-screen">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className="mx-auto h-auto w-auto" src="/images/easynews_logo.png" alt="easyNews" width={1000} height={800}/>
                </div>

                <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">ID</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="text" placeholder={'ID를 입력하세요'} className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" placeholder={'비밀번호를 입력하세요'} className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div className='login-button-div'>
                            <button type="button" className="login-button">
                                로그인
                            </button>

                            <button type="button" className="sign-up-button">
                                회원가입
                            </button>
                        </div>
                        <div>
                            <button type="button" className="naver-login-button" onClick={() => signIn('naver')}>
                                <div className="naver-login-button-div">
                                    <img src="/images/naver.png" alt="네이버" className="w-8 h-8"/>
                                </div>
                                <span className="oauth-button-span">
                                  네이버 로그인
                                </span>
                            </button>
                            <button type="button" className="google-login-button" onClick={() => signIn('google')}>
                                <div className="google-login-button-div">
                                    <img src="/images/google.png" alt="구글" className="w-8 h-8"/>
                                </div>
                                <span className="oauth-button-span">
                                  구글 로그인
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
