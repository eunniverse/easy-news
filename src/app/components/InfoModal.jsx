import React from 'react';
import ReactDOM from "react-dom";

const InfoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    X
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">회원가입</h2>
                    <div className="mb-4">

                    </div>
                    <div className='login-button-div'>
                        <button type="button" className="sign-up-button" onClick={onClose}>
                            닫기
                        </button>
                    </div>
            </div>
        </div>,
        document.getElementById("modal-root") // 포털을 사용할 DOM 노드
    );
};

export default InfoModal;