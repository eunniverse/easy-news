import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UserRegModal = ({ isOpen, onClose }) => {
    // Yup 스키마 정의
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("이름은 필수입니다."),
        loginId: Yup.string()
            .required("ID는 필수입니다.")
            .email("유효한 이메일 형식이 아닙니다."),
        password: Yup.string()
            .required("비밀번호는 필수입니다.")
            .min(8, "비밀번호는 8자 이상이어야 합니다."),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
            .required("비밀번호 확인은 필수입니다."),
    });

    // React Hook Form 설정
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // 회원가입 폼 제출 함수
    const onSubmit = async (data) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginId: data.loginId,
                name: data.name,
                password: data.password
            }),
        });

        if (res.ok) {
            alert('회원가입이 완료되었습니다.');
        } else {
            alert('회원가입을 실패하였습니다.');
        }
        reset();
        onClose();
    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            이름
                        </label>
                        <input
                            type="text"
                            name="name"
                            {...register("name")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            ID
                        </label>
                        <input
                            type="email"
                            name="loginId"
                            {...register("loginId")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.loginId && <p className="text-red-500 text-sm">{errors.loginId.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="password"
                            {...register("password")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            {...register("passwordConfirm")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm.message}</p>}
                    </div>
                    <div className='login-button-div'>
                        <button type="submit" className="login-button" onSubmit={onSubmit}>
                            확인
                        </button>

                        <button type="button" className="sign-up-button" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal-root") // 포털을 사용할 DOM 노드
    );
};

export default UserRegModal;
