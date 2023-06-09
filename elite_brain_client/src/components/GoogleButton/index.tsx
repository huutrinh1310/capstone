'use client';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function GoogleButton() {
    return (
        <div
            onClick={() => {
                signIn('google');
            }}
        >
            <FcGoogle className="bg-white rounded-full w-16 h-16 p-3 cursor-pointer" />
        </div>
    );
}
