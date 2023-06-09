import Button from '@/components/Button/Button';
import { signOut } from '@/services/AuthService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface HomeProps {}

export default function Home(props: HomeProps) {
    const router = useRouter();
    const handleLogout = async () => {
        signOut();
        router.push('/auth');
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
