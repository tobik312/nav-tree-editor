'use client';

import { createElement, CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

import type { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import type { TreeBaseItem, FlattenTreeItem } from '@/types/TreeStructure';

import { getProjection } from '@/utils/treeUtils';
import flattenSortableItemTreeComponent from '@/utils/flattenSortableItemTreeComponent';

import SortableTreeItemMargin from './SortableTreeItemMargin';
import SortableTreeIndicator from './SortableTreeIndicator';

export type SortableTreeItemProps<R extends HTMLElement, T extends TreeBaseItem<I>, I extends string = string> = {
    item: FlattenTreeItem<T, I>;
    itemComponent: ReturnType<typeof flattenSortableItemTreeComponent<R, T, I>>;
    treeId: string;
    indentationWidth: number;
    projectedItem?: ReturnType<typeof getProjection<T, I>> | null;
    isDisabled?: boolean;
    isActive?: boolean;
    isDragOverlay?: boolean;
};

const SortableTreeItem = <R extends HTMLElement, T extends TreeBaseItem<I>, I extends string = string>({
    item,
    itemComponent,
    treeId,
    indentationWidth,
    projectedItem,
    isDisabled,
    isActive,
    isDragOverlay,
}: SortableTreeItemProps<R, T, I>) => {
    const {
        index,
        newIndex,
        overIndex,
        attributes,
        isDragging,
        isSorting,
        listeners,
        setDraggableNodeRef,
        setDroppableNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id as UniqueIdentifier });

    let style: CSSProperties = {};

    const treeDroppableId = `${treeId}-${index}`;

    if (isActive && transform) {
        const overHeight = document.querySelector(`[data-tree-droppable="${treeId}-${overIndex}"]`)?.getBoundingClientRect()?.height ?? 0;

        const isUpper = newIndex <= index;
        const transformY = isUpper ? 0 : overHeight;

        style = {
            transform: CSS.Translate.toString({
                ...transform,
                y: transform.y + transformY,
            }),
            transition,
        };
    }

    return (
        <li
            ref={(ref) => ((!isDisabled || isActive) && setDroppableNodeRef(ref)) as void}
            className={twMerge('flex flex-col relative')}
            data-tree-droppable={treeDroppableId}
            data-tree-item
        >
            {isActive && (
                <div className="flex absolute w-full z-10" style={style}>
                    <SortableTreeItemMargin depth={projectedItem ? projectedItem.depth : item.depth} indentationWidth={indentationWidth} />
                    <SortableTreeIndicator />
                </div>
            )}
            <div className="flex">
                {!isDragOverlay && <SortableTreeItemMargin depth={item.depth} indentationWidth={indentationWidth} />}
                <div className="w-full">
                    {createElement(itemComponent, {
                        ref: (ref) => ((!isDisabled || isActive) && setDraggableNodeRef(ref)) as void,
                        item,
                        attributes,
                        isDragging,
                        isSorting,
                        listeners,
                        isDragOverlay,
                        isDisabled: isDisabled || isActive,
                    })}
                </div>
            </div>
        </li>
    );
};

export default SortableTreeItem;
