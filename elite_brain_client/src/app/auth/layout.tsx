import * as React from 'react';
import Navbar from '../../components/Navbar/Navbar';

export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <section className="h-screen flex flex-col bg-gradient-to-t from-indigo-100">
            <Navbar className="h-auto w-full ml-16" />
            <div className="flex-1 h-full">{children}</div>
        </section>
    );
}
