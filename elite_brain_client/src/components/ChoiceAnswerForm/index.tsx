import * as React from 'react';

export interface ChoiceAnswerProps {}

export default function ChoiceAnswer(props: ChoiceAnswerProps) {
    return (
        <div className="flex items-center me-[50px]">
            <div className="text-2xl">
                <span>Option</span>
                &nbsp;&nbsp;&nbsp;
                <select name="isCorrect" id="isCorrect">
                    <option value="correct">correct</option>
                    <option value="incorrect">incorrect</option>
                </select>
                <input className="font-bold text-2xl my-5 block" />
            </div>
        </div>
    );
}
