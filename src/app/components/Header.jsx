'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // 기본 CSS
import { RiLogoutCircleRFill } from "react-icons/ri";
import InfoModal from "@/app/components/InfoModal";

const Header = () => {
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

    const handleOpenInfoModal = () => {
        setIsOpenInfoModal(true);
    }

    const handleCloseInfoModal = () => {
        setIsOpenInfoModal(false);
    }

    return (
        <>
            <header className="flex justify-between items-center bg-black text-white p-3">
                <Image className="ml-2" src="/images/easynews_logo_white.png" alt="easyNews" width={170} height={40}/>
                <div className="flex space-x-4">
                    <div className="inline">
                        <Tippy content={'그동안 읽었던 뉴스를 바탕으로 검색한 단어를 확인할 수 있어요'} allowHTML={true}>
                            <button className="text-xl inline">
                                <MdPlaylistAddCheckCircle className="inline text-xl" />
                            </button>
                        </Tippy>
                    </div>
                    <div className="inline pr-2">
                        <Tippy content={'로그아웃'} allowHTML={true}>
                            <button className="text-xl inline">
                                <RiLogoutCircleRFill className="inline text-xl" />
                            </button>
                        </Tippy>
                    </div>
                    <InfoModal isOpen={isOpenInfoModal} onClose={handleCloseInfoModal} />
                </div>
            </header>
        </>
    );
};

export default Header;