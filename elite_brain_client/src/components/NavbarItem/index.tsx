'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface NavbarItemProps {
    title: string;
    icon: any;
    onClick?: () => void;
}

export default function NavbarItem({ title, icon }: NavbarItemProps) {
    const handleClick = () => {
        console.log(title);
    };
    return (
        <div
            className="rounded-3xl bg-primary-100 w-[50px] h-[50px] flex items-center cursor-pointer hover:bg-primary-200 transition-all duration-300"
            onClick={handleClick}
        >
            <FontAwesomeIcon
                className="w-full h-[20px] text-center text-primary-text"
                icon={icon}
            />
        </div>
    );
}
