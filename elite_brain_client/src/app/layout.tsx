'use client';
import React from 'react';
import './globals.scss';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/services/AuthService';
import { storageToken } from '@/utils/TokenStorage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isLogin, setIsLogin] = React.useState<Boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const checkAuthen = async () => {
            try {
                const result = await getProfile();
                if (result.data.role === 'USER') {
                    setIsLogin(true);
                } else if (result.status === 401) {
                } else {
                    storageToken.remove();
                    router.push('/auth');
                }
            } catch (e) {
                console.log(e);
            }
        };
        checkAuthen().then((r) => console.log(r));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    return (
        <html lang="en">
            <Head>
                <title>Next App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Next App" />
                <meta name="keywords" content="Next App" />
                <meta name="author" content="Next App" />
                <meta name="theme-color" content="#000000" />
            </Head>
            <body suppressHydrationWarning={true}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
