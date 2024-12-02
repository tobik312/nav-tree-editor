'use client';

import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { addNavItem } from '@/store/features/navTreeSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/appStore';

import type { TreeStructureItem } from '@/types/TreeStructure';
import type { NavItem, NavTreeItem } from '@/types/NavItem';

import Card, { CardBody } from '@/components/Card';
import Button from '@/components/Button';

import NavEmptyList from '@/components/Nav/NavEmptyList';
import NavList from '@/components/Nav/NavList';
import NavForm from '@/components/Nav/NavForm';

const NavTreeEditorView: React.FC = () => {
    const navTreeList = useAppSelector((state) => state.navTree);

    const dispatch = useAppDispatch();

    const [isFormOpen, setFormOpen] = useState(false);

    const handleAddChildClick = useCallback(() => {
        setFormOpen((open) => !open);
    }, []);

    const handleCancelClick = useCallback(() => {
        setFormOpen(false);
    }, []);

    const handleFormSubmit = useCallback(
        (navItem: NavItem) => {
            dispatch(
                addNavItem({
                    ...navItem,
                    id: uuid(),
                    parentId: null,
                    children: [],
                } as TreeStructureItem<NavTreeItem, string>),
            );
            setFormOpen(false);
        },
        [dispatch],
    );

    return (
        <div className="grid gap-6">
            {navTreeList.length <= 0 ? (
                <Card>
                    <NavEmptyList onAddItemClick={handleAddChildClick} />
                </Card>
            ) : (
                <Card>
                    <NavList navTree={navTreeList} />
                    <CardBody type="action" border={true}>
                        <Button variant="secondary" onClick={handleAddChildClick}>
                            Dodaj pozycję do menu
                        </Button>
                    </CardBody>
                </Card>
            )}
            {isFormOpen && <NavForm action="CREATE" item={null} onSubmit={handleFormSubmit} onCancel={handleCancelClick} />}
        </div>
    );
};

export default NavTreeEditorView;
