'use client';
import * as React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import ChoiceAnswer from '../ChoiceAnswerForm';
import { Choice } from '@/interface/Choice.interface';
export interface QuestionDetailFormProps {}

export default function QuestionDetailForm(props: QuestionDetailFormProps) {
    const [choiceNumber, setChoiceNumber] = React.useState(1);

    const [listChoices, setListChoice] = React.useState([]);
    setListChoice;

    const addMoreChoice = () => {
        setChoiceNumber(choiceNumber + 1);
    };

    const removeChoice = () => {
        console.log(choiceNumber);
        if (choiceNumber === 1) {
            return;
        }
        setChoiceNumber(choiceNumber - 1);
    };
    return (
        <form className="w-full px-16 py-8 rounded-3xl border-2 border-gray-000 mt-10">
            <label htmlFor="question" className="text-2xl text-text-200 inline-block">
                Question
            </label>
            <input
                id="question"
                name="question"
                className="block text-3xl font-normal text-text-300 border-b-2 pe-10 py-5"
            />
            <span className="text-text-200 text-2xl mt-16 inline-block">Answer</span>
            <div className="flex flex-wrap">
                {Array.from({ length: choiceNumber }).map(() => (
                    <ChoiceAnswer key={choiceNumber} />
                ))}
                <div className="flex flex-col justify-between">
                    <AiOutlinePlus
                        onClick={addMoreChoice}
                        className="cursor-pointer w-10 h-10 rounded-full bg-primary-200"
                    />
                    <AiOutlineMinus
                        onClick={removeChoice}
                        className="cursor-pointer w-10 h-10 rounded-full bg-primary-200"
                    />
                </div>
            </div>

            <span className="text-text-200 text-2xl">Explaination</span>
            <br />
            <input className="inline-block text-3xl font-normal  my-5" />
        </form>
    );
}
