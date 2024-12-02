import { LabelHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const InputLabel: React.FC<PropsWithChildren<InputLabelProps>> = ({ children, className, ...labelProps }) => {
    return (
        <label {...labelProps} className={twMerge('text-sm font-semibold text-secondary-dark cursor-pointer', className)}>
            {children}
        </label>
    );
};

export default InputLabel;
