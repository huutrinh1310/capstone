'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');

    const goBack = () => {
        window.history.back();
    };
    return (
        <div className="flex flex-col justify-center items-start w-[500px] h-screen mx-auto font-visby">
            <span className="font-bold font-sm/[25px] font-visby">Forgot your password?</span>
            <span className="">
                Enter your email and we`ll send you instruction on how to reset your password.
            </span>
            <form>
                <div className="flex flex-col py-2">
                    <input
                        className="bg-transparent border-b-2 border-[#E5E5E5] w-full h-[50px] mt-4"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <Button className="bg-primary text-white mt-4">Reset password</Button>
                </div>
            </form>
            <Button
                onClick={goBack}
                outline={false}
                leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                className="bg-primary text-white mt-4"
            >
                Go back
            </Button>
        </div>
    );
}
