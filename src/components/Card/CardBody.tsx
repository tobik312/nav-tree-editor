import React, { forwardRef, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardBodyVariant = 'primary' | 'secondary';
export type CardBodyType = 'content' | 'action';

export type CardBodyProps = {
    border?: boolean;
    variant?: CardBodyVariant;
    type?: CardBodyType;
};

const CardBody = forwardRef<HTMLDivElement, CardBodyProps & HTMLAttributes<HTMLDivElement>>(
    ({ children, className, border, variant, type = 'content', ...divProps }, ref) => {
        return (
            <div
                {...divProps}
                className={twMerge(
                    'p-6',
                    border && 'border-inherit border-t first:border-0',
                    variant === 'primary' && 'bg-white',
                    variant === 'secondary' && 'bg-teritary-light',
                    type == 'action' && 'flex gap-2',
                    className,
                )}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

CardBody.displayName = 'CardBody';

export default CardBody;
