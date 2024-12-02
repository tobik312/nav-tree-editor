'use client';

import { useCallback } from 'react';

import { sortNavItems } from '@/store/features/navTreeSlice';
import { useAppDispatch } from '@/hooks/appStore';

import type { TreeStructure } from '@/types/TreeStructure';
import type { NavTreeItem } from '@/types/NavItem';

import { CardBody } from '@/components/Card';
import SortableTree from '@/components/SortableTree';

import NavListItem from './NavListItem';

export type NavListProps = {
    navTree: TreeStructure<NavTreeItem>;
};

const NavList: React.FC<NavListProps> = ({ navTree }) => {
    const dispatch = useAppDispatch();

    const handleSortEnd = useCallback(
        (sortedTree: typeof navTree) => {
            dispatch(sortNavItems(sortedTree));
        },
        [dispatch],
    );

    return (
        <CardBody variant="secondary" border={true} className="p-0">
            <SortableTree tree={navTree} itemTreeComponent={NavListItem} indentationWidth={64} onSortEnd={handleSortEnd} />
        </CardBody>
    );
};

export default NavList;
