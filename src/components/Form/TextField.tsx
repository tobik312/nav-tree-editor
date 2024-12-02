'use client';

import { InputHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormContext } from 'react-hook-form';

import { PropsWithClassName } from '@/utils/PropsWithClassName';

import { AlertCircleIcon } from '@/assets/IconsAssets';

import InputLabel, { type InputLabelProps } from '@/components/Form/InputLabel';

export type TextFieldProps = PropsWithClassName<{
    name: string;
    label?: string;
    textHint?: string;
    error?: boolean;
    labelProps?: InputLabelProps;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>;
}>;

const TextField: React.FC<TextFieldProps> = ({ name, label, textHint, error, inputProps, labelProps, className }) => {
    const uniqId = useId();

    const inputName = name;
    const inputId = inputProps?.id ?? uniqId;

    const {
        register,
        formState: { errors },
    } = useFormContext();

    let inputFormProps;
    if (register) inputFormProps = register(inputName);

    const inputError = error || errors?.[inputName];
    const inputTextHint = errors?.[inputName]?.message || textHint;

    return (
        <div className={twMerge('flex flex-col gap-2', className)}>
            {label && (
                <InputLabel htmlFor={inputId} {...labelProps}>
                    {label}
                </InputLabel>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    {...(inputFormProps ?? {})}
                    {...inputProps}
                    className={twMerge(
                        'w-full placeholder:text-teritary-dark border border-secondary px-3 py-2 rounded-lg drop-shadow focus:shadow-focus-primary outline-none',
                        inputError && 'border-error-light focus:shadow-focus-error pr-10',
                        inputProps?.className,
                    )}
                />
                {inputError && <AlertCircleIcon className="text-error w-4 h-4 absolute right-3 top-3" />}
            </div>
            {inputTextHint && <span className={twMerge('text-black', inputError && 'text-error')}>{inputTextHint as string}</span>}
        </div>
    );
};

export default TextField;
