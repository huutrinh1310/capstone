'use client';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { BsGithub } from 'react-icons/bs';

export interface GitHubButtonProps {}

export default function GitHubButton(props: GitHubButtonProps) {
    return (
        <BsGithub
            onClick={() => {
                signIn('github');
            }}
            className="bg-white rounded-full w-16 h-16 p-3 cursor-pointer"
        ></BsGithub>
    );
}
