'use client';
import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';
import Image from 'next/image';
import eliteBrain from '../../assets/images/elite_brain.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfile } from '@/services/AuthService';
import { storageToken } from '@/utils/TokenStorage';

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isLogin, setIsLogin] = useState<Boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthen = async () => {
            try {
                const result = await getProfile();
                if (result.data.role === 'ADMIN') {
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
        <div className="flex flex-wrap bg-gradient-to-r from-[#F9F9FB] to-[#EFEFFB]">
            <Link href="/dashboard">
                <Image className="w-[86px] h-[92px] bg-white " src={eliteBrain} alt="logo" />
            </Link>
            <DashboardNavbar className="bg-white flex justify-between items-center h-[92px] pe-[20px] w-[calc(100%-86px)] border-b-2 border-primary-100" />
            <DashboardSidebar className="dashboard-sidebar flex flex-col bg-white w-[86px]  px-[5px] h-[calc(100vh-92px)] border-e-2 border-primary-100 justify-between" />
            <div className="flex-1 mr-20 m-[30px] me-0 pe-0 px-[30px]">{children}</div>
        </div>
    );
}
