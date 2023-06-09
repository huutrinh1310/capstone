'use client';
import { SubjectTopic } from '@/interface/SubjectTopic.interface';
import Image from 'next/image';
import * as React from 'react';
import imgJava from '@/assets/images/java.jpg';
import { useRouter } from 'next/navigation';
import { Topic } from '@/interface/Topic.interface';
import Link from 'next/link';

export interface SubjectCardProps {
    topic: Topic,
    subjectName: string|null;
}

export default function SubjectCard({ topic, subjectName }: SubjectCardProps) {
    const router = useRouter();

    return (
        <Link
            href={{
                pathname: `/dashboard/topic/${topic.id}`,
                query: {
                    subjectName: subjectName,
                    topicName: topic.topicName,
                },
            }}
            key={topic.id}
            className="flex-shrink-0 w-[300px] rounded-[15px] bg-white px-[29px] py-[50px] shadow-md hover:scale-105 transform transition-all duration-300 cursor-pointer"
        >
            <div className="w-full flex justify-between px-[12px]">
                <Image src={imgJava} alt="topic" />
                <div className="flex flex-col justify-center">
                    <p className="text-black text-center">{topic.questions.length}</p>
                    <p className="text-text-100">question{topic.questions.length > 1 ? 's' : ''}</p>
                </div>
            </div>
            <div className="flex justify-between ps-5 items-center mt-10">
                <p className="text-text-300 font-bold text-4xl">{topic.topicName}</p>
                <div
                    // onClick={handleViewDetail}
                    className="border-2 border-primary-text px-8 py-1 rounded-full  hover:opacity-50"
                >
                    View Detail
                </div>
            </div>
        </Link>
    );
}
