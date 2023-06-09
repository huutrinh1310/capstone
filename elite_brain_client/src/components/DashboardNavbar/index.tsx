'use client';
import { faBell, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import NavbarItem from '../NavbarItem';
import { usePathname } from 'next/navigation';

export interface IDashboardNavbarProps {
    className?: string;
}

export enum NavbarItemTitle {
    QUESTION = '/dashboard/subject',
    DASHBOARD = '/dashboard',
}

export default function DashboardNavbar({ className }: IDashboardNavbarProps) {
    // const [input, setInput] = React.useState('');
    // const [search, setSearch] = React.useState('');
    let titleNav = '';

    const pathname = usePathname();

    if (pathname.includes(NavbarItemTitle.QUESTION)) {
        titleNav = 'Question bank';
    } else if (pathname.includes(NavbarItemTitle.DASHBOARD)) {
        titleNav = 'Dashboard';
    }

    // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInput(e.target.value);
    // };

    // const handlerSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setSearch(input);
    // };

    return (
        <section className={className}>
            <div>
                <h3 className="font-bold text-4xl text-primary-text pl-10">{titleNav}</h3>
            </div>
            {/* <form
                className="w-[465px] h-[40px] flex bg-primary-100 rounded-full px-4 items-center text-primary-50"
                onSubmit={handlerSearch}
            >
                <FontAwesomeIcon className="w-[20px] text-current" icon={faMagnifyingGlass} />
                <input
                    className="w-full bg-transparent px-4 font-light text-3xl opacity-50 focus:outline-none placeholder:text-current
                    placeholder:italic"
                    type="text"
                    placeholder="Search..."
                    onChange={handleInput}
                />
            </form> */}
            <div className="flex w-[210px] justify-between pr-10">
                <NavbarItem title={'message'} icon={faComments} />
                <NavbarItem title={'notify'} icon={faBell} />
                <NavbarItem title={'user'} icon={faUser} />
            </div>
        </section>
    );
}
