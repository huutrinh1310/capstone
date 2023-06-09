'use client';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');

    const goBack = () => {
        window.history.back();
    };
    return (
        <div className="flex flex-col justify-center mx-auto h-full items-center place-content-center gap-10 w-[20%]">
            <form action="" className="relative w-full group ">
                <div className="text-5xl mt-4 mb-16 font-bold font-visbyCF text-left text-[#111727]">
                    Forgot your password?
                </div>
                <div className="text-2xl text-[#7C7F84] font-brandon">
                    <p className=" text-left">
                        Enter your email and we'll send you instruction on how to reset your
                        password.{' '}
                    </p>
                </div>
                <div className="relative mt-10">
                    <input
                        className="w-full text-black py-4 mb-4  border-b-2 bg-transparent border-[#e8e7e9] outline-none focus:outline-none"
                        id="password_login"
                        type="text"
                        name="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <button className="w-full text-3xl text-white mt-15 font-normal bg-[#304ecc] rounded-3xl p-4 text-center flex items-center justify-center mt-10">
                    Reset password
                </button>
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
