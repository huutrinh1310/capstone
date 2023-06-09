'use client';
import { Question } from '@/interface/Question.interface';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import QuestionDetail, { QuestionType } from '../QuestionDetail';

export interface RowQuestionProps {
    formSubmit?: boolean;
    data: Question;
    children?: React.ReactNode;
    topicName: string | null;
    subjectName: string | null;
}

export default function RowQuestion({ data, topicName, subjectName }: RowQuestionProps) {
    const [showDetail, setShowDetail] = React.useState(false);

    const toggleDetail = React.useCallback(() => {
        setShowDetail(!showDetail);
    }, [showDetail]);

    return (
        <div>
            <div
                className='flex items-center justify-between mt-10 cursor-pointer'
                onClick={toggleDetail}
            >
                <div className='flex gap-[60px]'>
                    <div className='text-text-200 text-3xl'>
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className={`text-text-200 text-3xl flex-0  transition duration-100 me-10 ${
                                showDetail ? 'rotate-0' : 'rotate-180'
                            }`}
                        />
                        <span>{data.questionType}</span>
                    </div>
                    <span className='text-text-200 text-3xl'>{subjectName}</span>
                    <span className='text-text-200 text-3xl'>{topicName}</span>
                    <span className='text-text-200 text-3xl'>{data.question}</span>
                </div>
                <div className='flex flex-wrap w-36 gap-2'>
                    {data.questionType === QuestionType.MCQ ? (
                        data.choices.map(choice => (
                            <div
                                key={choice.id}
                                className='flex justify-center items-center bg-text-200 rounded-full w-16 h-16 text-center'>
                                <span className='text-white text-4xl text-center'>
                                    {choice.id}
                                </span>
                            </div>
                        ))
                    ) : (
                        <span
                            className='decoration-2 underline italic text-text-200 text-3xl me-10'
                        >
                        {data.choices[0].content}
                    </span>
                    )}
                </div>

            </div>
            {showDetail ? <QuestionDetail type={data.questionType} data={data} /> : null}
        </div>
    );
}
