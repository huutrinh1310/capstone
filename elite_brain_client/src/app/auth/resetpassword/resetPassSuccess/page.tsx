'use client';
import * as React from 'react';
import Lottie from 'lottie-react';
import { ReactEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { storageToken } from '@/utils/TokenStorage';
import resetPassSuccess from '../../../../assets/lottieJson/resetSuccessfully.json';

export interface IResetStatusProps {}

export default function ResetStatus(props: IResetStatusProps) {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');

    const [isLogin, setIsLogin] = useState(false);

    //TODO: handle confirm password
    const handleConfirmPassword = (
        e: React.ChangeEvent<HTMLInputElement>,
        passwordValue: string,
        confirmValue: string
    ) => {
        if (passwordValue !== confirmValue) {
            e.target.setCustomValidity('Password does not match');
        }
    };

    const [variant, setvariant] = useState<Boolean>(true);
    const toggleClick = () => {
        setvariant(!variant);
    };
    useEffect(() => {
        setPassword('');
        setConfirmPass('');
        setName('');
        setEmail('');
    }, [variant]);

    const handleOnchangeConfirmPass = (e: any) => {
        setConfirmPass(e.target.value);
    };

    const handleOnchange = (e: any) => {
        setPassword(e.target.value);
    };
    return (
        // <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="grid place-content-center ">
            <form action="" className="relative w-full group ">
                <Lottie
                    className="w-[300px] justify-center items-center"
                    animationData={resetPassSuccess}
                ></Lottie>
                <div className="text-4xl text-[#7C7F84] font-brandon">
                    <p className="justify-center items-center text-center">
                        Your password has been reset
                    </p>
                </div>
                <div className="text-5xl mt-4 mb-16 font-bold font-visbyCF justify-center items-center text-center text-[#111727]">
                    Successfully
                </div>
                <button className="w-full text-3xl text-white mt-15 font-semibold bg-[#304ecc] rounded-xl p-4 text-center flex items-center justify-center">
                    Continue to Homepage
                </button>
            </form>
        </div>
    );
}
