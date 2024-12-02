import Link from 'next/link';

import type { NavTreeItem } from '@/types/NavItem';

import ButtonGroup from '@/components/ButtonGroup';
import Button from '@/components/Button';

type NavItemComponentProps = {
    item: NavTreeItem;
    onDeleteClick?: () => void;
    onEditClick?: () => void;
    onAddChildClick?: () => void;
    hiddeActions?: boolean;
};

const NavItemComponent: React.FC<NavItemComponentProps> = ({ item, onDeleteClick, onEditClick, onAddChildClick, hiddeActions }) => {
    return (
        <div className="flex items-center text-sm w-full">
            <div className="grid gap-1.5">
                <div className="text-black font-semibold">{item.label}</div>
                {item?.url && (
                    <Link className="text-teritary cursor-pointer" href={item.url} target="_blank">
                        {item.url}
                    </Link>
                )}
            </div>
            {!hiddeActions && (
                <ButtonGroup className="ml-auto flex-none">
                    <Button variant="secondary" onClick={onDeleteClick}>
                        Usuń
                    </Button>
                    <Button variant="secondary" onClick={onEditClick}>
                        Edytuj
                    </Button>
                    <Button variant="secondary" onClick={onAddChildClick}>
                        Dodaj pozycję do menu
                    </Button>
                </ButtonGroup>
            )}
        </div>
    );
};

export default NavItemComponent;
