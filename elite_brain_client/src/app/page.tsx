'use client';
import Button from '@/components/Button/Button';
import { signOut as signOutService } from '@/services/AuthService';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
    const handleLogout = async () => {
        signOutService();
        signOut();
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center">
                <Image src="/assets/nextjs.svg" alt="Next.js Logo" width={200} height={160} />
                <h1 className="text-6xl font-bold">Next.js + Tailwind CSS</h1>
                <p className="text-2xl mt-4">
                    with TypeScript, ESLint, Prettier, Husky, Lint-Staged, Absolute Import
                </p>
                <Button
                    onClick={handleLogout}
                    outline
                    className="hover:bg-red-500"
                    leftIcon={<i className="fas fa-sign-out-alt"></i>}
                    rounded
                    large
                    primary
                >
                    Logout
                </Button>
            </div>
        </main>
    );
}
