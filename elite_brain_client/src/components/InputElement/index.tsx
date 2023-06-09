import * as React from 'react';

export interface InputElementProps {
    className?: string;
    value: string;
    name: string;
    placeholder: string;
    visible?: boolean;
    password?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    IconVisible?: React.ReactNode;
    IconInvisible?: React.ReactNode;
    id: string;
    onClick?: () => void;
}

export default function InputElement({
    className,
    value,
    visible = true,
    onChange,
    password,
    id,
    IconVisible,
    placeholder,
    name,
    IconInvisible,
    onClick,
}: InputElementProps) {
    return (
        <div className={className}>
            <input
                className="w-full text-black py-4 mb-4 border-b-2 bg-transparent border-[#e8e7e9] outline-none focus:outline-none"
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                type={visible ? 'text' : 'password'}
                onChange={onChange}
            />
            {password && (
                <i className="absolute right-1 top-5 cursor-pointer" onClick={onClick}>
                    {visible ? IconVisible : IconInvisible}
                </i>
            )}
        </div>
    );
}
