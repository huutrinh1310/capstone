import * as React from 'react';
import { useMemo } from 'react';

export interface OTPFieldProps {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
}

export const RE_DIGIT: RegExp = new RegExp(/^\d+$/);

export default function OTPField({ value, valueLength, onChange }: OTPFieldProps) {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
            target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };
    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number,
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

        // only delete digit if next input element has no value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };
    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;
        console.log(key);
        //TODO: Can not use arrow key to move between input. Need to fix this
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }

        focusToPrevInput(target);
    };
    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;

        // keep focusing back until previous input
        // element has value
        const prevInputEl =
            target.previousElementSibling as HTMLInputElement | null;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div>
            {/*<form action='' method='post'>*/}
                <div className='flex flex-col space-y-16'>
                    <div className='flex flex-row items-center justify-between'>
                        {valueItems.map((digit, idx) => (
                            <div className='w-20 h-20' key={idx}>
                                <input
                                    className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    pattern="\d{1}"
                                    maxLength={valueLength}
                                    value={digit}
                                    onChange={(e) => inputOnChange(e, idx)}
                                    onKeyDown={inputOnKeyDown}
                                    onFocus={inputOnFocus}
                                />
                            </div>
                        ))}
                    </div>


                </div>
            {/*</form>*/}
        </div>
    );
}
