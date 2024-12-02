import { PropsWithChildren } from 'react';

const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="max-w-[1168px] mx-auto p-4 py-6">{children}</div>;
};

export default Container;
