'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';

export interface DashboardSidebarItemProps {
    to?: string;
    icon: any;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function DashboardSidebarItem({
    to,
    icon,
    children,
    className,
    onClick,
}: DashboardSidebarItemProps) {
    return to ? (
        <Link href={to} className={className}>
            <FontAwesomeIcon className="w-[25px] h-[25px] text-primary-text" icon={icon} />
            <span className="hidden">{children}</span>
        </Link>
    ) : (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon className="w-[25px] h-[25px] text-primary-text" icon={icon} />
            <span className="hidden">{children}</span>
        </div>
    );
}
