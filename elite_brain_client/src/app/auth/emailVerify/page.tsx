'use client';
import Verify from '@/assets/images/Verify.png';
import Img from 'next/image';
import OTPField from '@/components/OTPField';
import { useEffect, useState } from 'react';
import { emailVerify, resendOTP } from '@/services/AuthService';
import { EmailVerifyRequest } from '@/models/request/EmailVerifyRequest';
import router from "next/router";
import { useRouter } from 'next/navigation';


export interface EmailVerifyProps {
}

export default function EmailVerify(props: EmailVerifyProps) {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('vthienminh1801@gmail.com');
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const onChange = (value: string) => setOtp(value);
    useEffect(() => {
        if (isSuccess) {
            router.push('/auth/createAccountSuccess');
        }
    }, [isSuccess, router]);

    const handleVerify = async (e: any) => {
        try {
            e.preventDefault();
            const OTPValue: EmailVerifyRequest = {
                email,
                otp,
            };
            const response = await emailVerify(OTPValue);
            if (response.status === 200) {
                setIsSuccess(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleResend = async (e: any) => {
        try {
            e.preventDefault();
            const response = await resendOTP(email);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
//TODO: Test function
    const handleBack = () => {
        router.back();
    }

    return (
        <div className='flex flex-wrap h-full mx-32'>
            <div className='w-[50%] self-center'>
                <div className='flex flex-col justify-center items-center'>
                    <Img src={Verify} width={450} alt='login' />
                </div>
            </div>
            <div className='w-[50%] self-center'>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='mx-auto flex w-full max-w-lg flex-col space-y-14'>
                        <div className='flex flex-col gap-8 items-center justify-center text-center space-y-2'>
                            <div className='font-semibold text-4xl'>
                                <p>Verify your email address</p>
                            </div>
                            <div className='flex flex-row text-sm font-normal text-gray-600'>
                                <p>A verification code has been sent to <span className="underline">{email}</span></p>
                            </div>
                            <div className='flex flex-row text-sm font-normal text-justify text-gray-400'>
                                <p>Please check your inbox and enter the verification code below to verify your email
                                    address. The code will expire after 10 minutes.</p>
                            </div>
                        </div>
                        <OTPField value={otp} valueLength={6} onChange={onChange} />

                        <div className='flex flex-col space-y-5'>
                            <div>
                                <button
                                    onClick={handleVerify}
                                    className='flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-[#304ecc] border-none text-white text-md shadow-sm'>
                                    Verify
                                </button>
                            </div>
                            <div>
                                <div className='mx-5 flex justify-between text-indigo-700 text-base'>
                                    <button onClick={handleResend}>Resend code</button>
                                    <button onClick={handleBack}>Change email adress</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
