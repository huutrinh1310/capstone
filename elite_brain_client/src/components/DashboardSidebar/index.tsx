'use client';
import * as React from 'react';
import DashboardSidebarItem from '../DashboardSidebarItem';
import {
    faBars,
    faRectangleList,
    faGear,
    faLayerGroup,
    faChartSimple,
    faSignOutAlt,
    faUserGroup,
    faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from '@/services/AuthService';

import { useRouter } from 'next/navigation';

export interface DashboardSidebarProps {
    className?: string;
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {
    const router = useRouter();

    const toggleMenu = () => {
        console.log('object');
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/auth');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={className}>
            <div className="flex flex-col">
                <DashboardSidebarItem
                    onClick={toggleMenu}
                    icon={faBars}
                    className="text-center p-4 mb-5"
                >
                    Menu
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    to="/dashboard"
                    icon={faLayerGroup}
                    className="text-center p-4 mb-5"
                >
                    Dashboard
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    to="/dashboard/subject"
                    icon={faDatabase}
                    className="text-center p-4 mb-5"
                >
                    Question Bank
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    to="/dashboard/template"
                    icon={faRectangleList}
                    className="text-center p-4 mb-5"
                >
                    Test Template
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    to="/dashboard/user"
                    icon={faUserGroup}
                    className="text-center p-4 mb-5"
                >
                    Users Manager
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    to="/dashboard/statistic"
                    icon={faChartSimple}
                    className="text-center p-4 mb-5"
                >
                    Statistic
                </DashboardSidebarItem>
            </div>
            <div className="flex flex-col">
                <DashboardSidebarItem to="/settings" icon={faGear} className="text-center p-4 mb-5">
                    Settings
                </DashboardSidebarItem>
                <DashboardSidebarItem
                    onClick={() => {
                        handleLogout();
                    }}
                    icon={faSignOutAlt}
                    className="text-center p-4 mb-5 cursor-pointer"
                >
                    Logout
                </DashboardSidebarItem>
            </div>
        </div>
    );
}
