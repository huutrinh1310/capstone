'use client';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '@/assets/lottieJson/groovyWalk.json';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex justify-center items-center">
            <Lottie animationData={groovyWalkAnimation} className="w-[300px] h-[300px]" />
        </div>
    );
}
