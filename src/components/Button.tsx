import { PropsWithChildren, ButtonHTMLAttributes, createElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { PropsWithClassName } from '@/utils/PropsWithClassName';

import Icon, { IconVariant } from '@/components/Icon';

type ButtonVariant = 'primary' | 'secondary' | 'secondary-colored' | 'teritary';

type ButtonPropsType = PropsWithClassName<{
    variant: ButtonVariant;
    leadingIcon?: IconVariant;
}>;

const Button: React.FC<PropsWithChildren<ButtonPropsType> & ButtonHTMLAttributes<HTMLButtonElement>> = ({
    variant,
    leadingIcon,
    className,
    children,
    ...buttonProps
}) => {
    return (
        <button
            {...buttonProps}
            className={twMerge(
                'inline-flex gap-1.5 items-center border cursor-pointer rounded-lg px-3.5 py-2.5 font-semibold text-sm drop-shadow outline-none',
                variant === 'primary' && 'bg-primary border-primary text-white hover:bg-primary-dark focus:shadow-focus-primary',
                (variant === 'secondary' || variant == 'secondary-colored') &&
                    'bg-white border-secondary text-secondary-dark hover:bg-teritary-light focus:shadow-focus-secondary',
                variant === 'secondary-colored' &&
                    'border-primary-light text-primary-dark hover:bg-primary-lighter focus:shadow-focus-primary',
                variant === 'teritary' && 'bg-transparent border-transparent text-teritary hover:bg-teritary-light drop-shadow-none',
                //Only Icon variant
                leadingIcon && !children && 'p-2.5',
                className,
            )}
        >
            {leadingIcon &&
                createElement(Icon[leadingIcon], {
                    className: 'w-5 h-5',
                })}
            {children}
        </button>
    );
};

export default Button;
