import { SubjectTopic } from '@/interface/SubjectTopic.interface';
import * as React from 'react';
import SubjectCard from '../SubjectsCard';
import { Topic } from '@/interface/Topic.interface';

export interface ListSubjectsProps {
    className?: string;
    listTopic: Topic[];
    children?: React.ReactNode;
    subjectName: string|null;
}

export default function ListSubjects({ className, children, listTopic, subjectName }: ListSubjectsProps) {
    return (
        <div className={className}>
            <h3 className="text-3xl text-text-100 mb-6">{children}</h3>
            <div className="flex gap-[30px] overflow-x-auto scrollbar-hide py-11 px-3">
                {listTopic.map((topic) => SubjectCard({ topic, subjectName }))}
            </div>
        </div>
    );
}
