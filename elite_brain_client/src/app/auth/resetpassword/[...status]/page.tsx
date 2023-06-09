'use client';
import * as React from 'react';
import { ReactEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { storageToken } from '@/utils/TokenStorage';

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
        <div className="grid place-content-center ">
            <form action="" className="relative w-full group ">
                <div className="text-5xl mt-4 mb-16 font-bold font-visbyCF justify-center items-center text-center text-[#111727]">
                    Reset your password
                </div>
                <div className="text-2xl text-[#7C7F84] font-brandon">
                    <p className="justify-center items-center text-center">
                        Enter your email and we'll send you instruction on how to reset your
                        password.{' '}
                    </p>
                </div>
                <div className="relative mt-10">
                    <input
                        className="w-full text-black py-4 mb-4  border-b-2 bg-transparent border-[#e8e7e9] outline-none focus:outline-none"
                        name="password"
                        id="password_login"
                        value={password}
                        placeholder="Enter a new password"
                        type={visible ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="absolute right-1 top-5" onClick={() => setVisible(!visible)}>
                        {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </i>
                </div>
                <div className="relative mb-10">
                    <input
                        className="w-full text-black py-4 mb-4 border-b-2 bg-transparent border-[#e8e7e9] outline-none focus:outline-none"
                        name="password"
                        id="password_login"
                        value={password}
                        placeholder="Confirm your new password"
                        type={visible ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="absolute right-1 top-5" onClick={() => setVisible(!visible)}>
                        {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </i>
                </div>

                <button className="w-full text-3xl text-white mt-15 font-semibold bg-[#304ecc] rounded-3xl p-4 text-center flex items-center justify-center">
                    Change Password
                </button>
            </form>
        </div>
    );
}
