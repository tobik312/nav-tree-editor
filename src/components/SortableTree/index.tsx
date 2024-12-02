'use client';

import { ReactElement, startTransition, useCallback, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    DragOverEvent,
    UniqueIdentifier,
    DragMoveEvent,
    Modifier,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    MeasuringStrategy,
    pointerWithin,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import type { FlattenTreeItem, TreeBaseItem, TreeStructure } from '@/types/TreeStructure';

import { PropsWithClassName } from '@/utils/PropsWithClassName';
import flattenSortableItemTreeComponent from '@/utils/flattenSortableItemTreeComponent';
import { buildTreeFromFlatten, flattenTree, getProjection } from '@/utils/treeUtils';

import SortableTreeItem from './SortableTreeItem';

export type SortableTreeProps<
    T extends TreeBaseItem<I>,
    I extends string = string,
    R extends HTMLElement = HTMLElement,
> = PropsWithClassName<{
    tree: TreeStructure<T, I>;
    itemTreeComponent: ReturnType<typeof flattenSortableItemTreeComponent<R, T, I>>;
    indentationWidth?: number;
    onSortEnd?: (sortedTree: TreeStructure<T, I>) => void;
}>;

const SortableTree = <T extends TreeBaseItem<I>, I extends string = string, R extends HTMLElement = HTMLElement>({
    tree,
    itemTreeComponent,
    indentationWidth = 50,
    onSortEnd,
    className,
}: SortableTreeProps<T, I, R>): ReactElement => {
    const treeId = useId();

    //Tree structure
    const items = useMemo(() => flattenTree<T, I>(tree), [tree]);

    //Tree state
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);

    const activeItem = useMemo(() => items.find((i) => i.id == activeId), [items, activeId]);
    const activeItemChilds = useMemo(() => (activeItem ? flattenTree(activeItem.children) : []), [activeItem]);

    const itemsIds = useMemo(() => items.map(({ id }) => id as UniqueIdentifier), [items]);
    const projectedItems = useMemo(
        () => items.filter((item) => activeItemChilds.length <= 0 || activeItemChilds.some((i) => i.id != item.id)),
        [items, activeItemChilds],
    );

    const projectedItem = useMemo(
        () => (activeId && overId ? getProjection(projectedItems, activeId as I, overId as I, offsetLeft, indentationWidth) : null),
        [activeId, overId, projectedItems, offsetLeft, indentationWidth],
    );

    const resetState = useCallback(() => {
        setActiveId(null);
        setOverId(null);
        setOffsetLeft(0);
    }, []);

    //DnD state
    const dragAndDropSensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    //DnD handlers
    const handleDragStart = useCallback(({ active: { id: activeId } }: DragStartEvent) => {
        setActiveId(activeId);
    }, []);

    const handleDragOver = useCallback(({ over }: DragOverEvent) => {
        setOverId(over?.id ?? null);
    }, []);

    const handleDragMove = useCallback(({ delta }: DragMoveEvent) => {
        setOffsetLeft(delta.x);
    }, []);

    const handleDragCancel = useCallback(() => {
        resetState();
    }, [resetState]);

    const handleDragEnd = useCallback(() => {
        startTransition(() => {
            resetState();

            if (projectedItem && overId) {
                const { depth, parentId } = projectedItem;
                const clonedItems: FlattenTreeItem<T, I>[] = JSON.parse(JSON.stringify(flattenTree(tree)));
                const overIndex = clonedItems.findIndex(({ id }) => id === overId);
                const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
                const activeTreeItem = clonedItems[activeIndex];

                clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

                const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
                const newItems = buildTreeFromFlatten(sortedItems);

                onSortEnd?.(newItems);
            }
        });
    }, [resetState, tree, onSortEnd, projectedItem, overId, activeId]);

    return (
        <DndContext
            sensors={dragAndDropSensors}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragMove={handleDragMove}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={itemsIds}>
                <ul className={twMerge('relative', className)}>
                    {items.map((item) => (
                        <SortableTreeItem
                            key={`${treeId}-${item.id}`}
                            item={item}
                            itemComponent={itemTreeComponent}
                            treeId={treeId}
                            indentationWidth={indentationWidth}
                            isActive={item.id == activeId}
                            isDisabled={activeItemChilds.some((child) => child.id == item.id)}
                            projectedItem={projectedItem}
                        />
                    ))}
                </ul>
                {typeof window !== 'undefined' &&
                    createPortal(
                        <DragOverlay modifiers={[adjustOverlayIndicatorTranslate]}>
                            {activeItem && (
                                <SortableTreeItem
                                    item={activeItem}
                                    treeId={treeId}
                                    itemComponent={itemTreeComponent}
                                    indentationWidth={indentationWidth}
                                    isDragOverlay
                                />
                            )}
                        </DragOverlay>,
                        document.body,
                    )}
            </SortableContext>
        </DndContext>
    );
};

export default SortableTree;

const adjustOverlayIndicatorTranslate: Modifier = ({ transform }) => {
    return {
        ...transform,
        y: transform.y + 8,
    };
};
