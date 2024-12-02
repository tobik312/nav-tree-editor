'use client';

import { useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';

import type { TreeStructureItem } from '@/types/TreeStructure';
import type { NavItem, NavTreeItem } from '@/types/NavItem';

import flattenSortableItemTreeComponent from '@/utils/flattenSortableItemTreeComponent';

import { addNavItem, deleteNavItem, editNavItem } from '@/store/features/navTreeSlice';

import { useAppDispatch } from '@/hooks/appStore';

import Button from '@/components/Button';

import NavItemComponent from './NavItemComponent';
import NavForm from './NavForm';

export type NavEmptyListProps = {
    onAddItemClick: () => void;
};

const NavListItem = flattenSortableItemTreeComponent<HTMLDivElement, NavTreeItem>(
    ({ item, attributes, listeners, isDisabled, isDragOverlay }, ref) => {
        const [action, setAction] = useState<'CREATE' | 'EDIT' | null>(null);

        const dispatch = useAppDispatch();

        const handleEditClick = useCallback(() => {
            setAction('EDIT');
        }, []);

        const handleAddChildClick = useCallback(() => {
            setAction('CREATE');
        }, []);

        const handleDeleteClick = useCallback(() => {
            dispatch(deleteNavItem(item.id));
        }, [dispatch, item]);

        const handleEditCancelClick = useCallback(() => {
            setAction(null);
        }, []);

        const handleFormSubmit = useCallback(
            (navItem: NavItem) => {
                if (action === 'CREATE')
                    dispatch(
                        addNavItem({
                            ...navItem,
                            id: uuid(),
                            parentId: item.id,
                            children: [],
                        } as TreeStructureItem<NavTreeItem, string>),
                    );
                else if (action === 'EDIT')
                    dispatch(
                        editNavItem({
                            ...item,
                            ...navItem,
                        }),
                    );

                setAction(null);
            },
            [item, action, dispatch],
        );

        return (
            <div ref={ref} {...attributes} className={twMerge('gap-1', isDisabled && 'opacity-40', !isDragOverlay && '-mt-px -mx-px')}>
                <div
                    className={twMerge(
                        'p-6 flex items-center border border-secondary-light bg-white',
                        //Round bottom left corner when item is last child
                        !isDragOverlay && item.depth > 0 && !item.nextSibling && 'rounded-bl-lg',
                        //Round bottom left corner when item has childs
                        !isDragOverlay && item.depth > 0 && item.children.length > 0 && 'rounded-bl-lg',
                        //Round top left corner when item sibling has childs
                        !isDragOverlay && item.depth > 0 && item.prevSibling && item.prevSibling.children.length > 0 && 'rounded-tl-lg',
                        isDragOverlay && 'absolute border border-secondary rounded-lg w-auto opacity-95',
                    )}
                >
                    <Button {...listeners} variant="teritary" leadingIcon="MoveIcon" className="flex-none" />
                    <NavItemComponent
                        item={item}
                        onEditClick={handleEditClick}
                        onAddChildClick={handleAddChildClick}
                        onDeleteClick={handleDeleteClick}
                        hiddeActions={isDragOverlay}
                    />
                </div>
                {action != null && !isDragOverlay && (
                    <div className={twMerge('p-6 pl-16')}>
                        <NavForm
                            action={action}
                            item={action == 'EDIT' ? item : null}
                            onSubmit={handleFormSubmit}
                            onCancel={handleEditCancelClick}
                            onDelete={handleDeleteClick}
                        />
                    </div>
                )}
            </div>
        );
    },
);

export default NavListItem;
