'use client';
import * as React from 'react';
import Img from 'next/image';
import Button from '@/components/Button/Button';
import Lottie from 'lottie-react';
import { ReactEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { storageToken } from '@/utils/TokenStorage';
import resetPassSuccess from '../../../../assets/lottieJson/resetSuccessfully.json';
import sentEmail from '@/assets/images/emailSent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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
    const goBack = () => {
        window.history.back();
    };
    return (
        <div className="grid place-content-center ">
            <form action="" className="relative w-full group ">
                <div className="text-5xl mt-4 mb-12 font-bold font-visbyCF justify-center items-center text-center text-[#111727]">
                    Email has been sent!
                </div>
                <div className="text-[15px] mt-4 mb-6 text-[#7C7F84] font-brandon">
                    Please check your inbox and click on the link received to reset your password.
                </div>
                <div className="w-[300px] mx-auto">
                    <Img src={sentEmail} alt="sentEmail" />
                </div>
                <div className="font-semibold text-[15px] text-slate-500 text-center md:text-center mt-10">
                    Didn't receive the email?{' '}
                    <i
                        className="text-[#304ecc] hover:underline hover:underline-offset-4 cursor-pointer"
                        onClick={toggleClick}
                    >
                        Click to resend
                    </i>
                </div>
            </form>
            <div className="w-full mx-auto">
                <button
                    onClick={goBack}
                    className="text-[#7C7F84] mt-4 mx-auto block cursor-pointer"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>Go back</span>
                </button>
            </div>
        </div>
    );
}
