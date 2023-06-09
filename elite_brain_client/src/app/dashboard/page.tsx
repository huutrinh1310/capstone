'use client';
import * as React from 'react';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '@/assets/lottieJson/groovyWalk.json';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
    return (
        <div className="text-text-400 text-4xl font-bold">
            <h1>Dashboard</h1>
            <div className="flex justify-center items-center">
                <Lottie animationData={groovyWalkAnimation} className="w-[300px] h-[300px]" />
            </div>
        </div>
    );
}
