import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

import { PropsWithClassName } from '@/utils/PropsWithClassName';

import Button from '@/components/Button';

export type ButtonGroupProps = PropsWithClassName<{
    children?: ReactElement<typeof Button>[];
}>;

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                'flex group/button overflow-hidden drop-shadow',
                //Disable buttons shadows settings
                '[&>*]:drop-shadow-none [&>*:focus]:shadow-none',
                //Rouned on group corners
                '[&>*]:rounded-none [&>:first-child]:rounded-l-lg [&>:last-child]:rounded-r-lg [&>*+*]:border-l-0',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default ButtonGroup;
