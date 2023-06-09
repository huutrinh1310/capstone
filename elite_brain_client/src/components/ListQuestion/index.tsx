'use client';
import { Question } from '@/interface/Question.interface';
import * as React from 'react';
import RowQuestion from '../RowQuestion';

export interface ListQuestionProps {
    listQuestion: Question[];
    children?: React.ReactNode;
    className?: string;
    topicName: string|null;
    subjectName: string|null;
}

export default function ListQuestion({ listQuestion, className, children , topicName,  subjectName}: ListQuestionProps) {
    return (
        <div className={className}>
            {listQuestion.map((question) => (
                <RowQuestion subjectName={subjectName} topicName={topicName} key={question.id} data={question} >{question.id}</RowQuestion>
            ))}
        </div>
    );
}
