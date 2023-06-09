import { Question } from '@/interface/Question.interface';
import { faClone, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { FiTrash } from 'react-icons/fi';

export enum QuestionType {
    MCQ = 'multiple',
    FILL = 'fill',
}

export interface QuestionDetailProps {
    data: Question;
    type: QuestionType;
}

export default function QuestionDetail({ data }: QuestionDetailProps) {
    const [showEdit, setShowEdit] = React.useState(false);

    const toggleEdit = React.useCallback(() => {
        setShowEdit(!showEdit);
    }, [showEdit]);
    console.log(data);

    return (
        <form className="px-16 py-8 rounded-3xl border-2 border-gray-000 mt-10">
            <span className="text-2xl text-text-200">Question</span>
            <div className="absolute right-96">
                <>
                    <FontAwesomeIcon
                        onClick={toggleEdit}
                        icon={faPenToSquare}
                        className="relative right-20 cursor-pointer"
                    />
                    <FontAwesomeIcon
                        onClick={() => {
                            console.log('copy');
                        }}
                        icon={faClone}
                        className="relative right-10 cursor-pointer"
                    />
                </>
            </div>
            <h3 className="text-4xl font-bold text-text-300 mt-16">{data?.question}</h3>
            <span className="text-text-200 text-2xl mt-16 inline-block">Answer</span>
            {data.questionType === 'multiple' ? (
                <div className="flex gap-40 mt-5">
                    {data?.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center">
                            <div
                                className={`${
                                    choice.correct ? 'text-green-400' : 'text-red-500'
                                } text-xl`}
                            >
                                <span>Option {choice.key}</span>
                                &nbsp;&nbsp;&nbsp;
                                <span>{choice.correct ? 'correct' : 'incorrect'}</span>
                                <span className="text-2xl my-5 inline-block">
                                    {choice.content}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            {data.questionType === QuestionType.FILL ? (
                <div className="font-bold text-2xl my-5 text-green-400 w-auto">
                    {data.choices[0].content}
                </div>
            ) : null}
            <span className="text-text-200 text-2xl">Explaination</span>
            <br />
            <span className="inline-block font-bold my-5">{data?.choices[0].explain}</span>
        </form>
    );
}
