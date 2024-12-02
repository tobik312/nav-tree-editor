import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { PropsWithClassName } from '@/utils/PropsWithClassName';

export type CardVariant = 'primary' | 'secondary';

export type CardPropsType = PropsWithClassName<{
    variant?: CardVariant;
}>;

const Card: React.FC<PropsWithChildren<CardPropsType>> = ({ variant = 'primary', className, children }) => {
    return (
        <div
            className={twMerge(
                'flex flex-col border rounded-lg overflow-hidden',
                variant === 'primary' && 'border-secondary',
                variant === 'secondary' && 'border-secondary-light',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Card;
