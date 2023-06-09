import Image from 'next/image';
import * as React from 'react';
import logo from '@/assets/images/logo.jpg';

export default function Navbar({ className: className }: { className?: string }) {
    return (
        <nav className={className}>
            <Image src={logo} alt="Logo Image" className="w-[200px]" />
        </nav>
    );
}
