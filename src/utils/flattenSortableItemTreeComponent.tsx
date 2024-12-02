'use client';

import { forwardRef, ForwardRefRenderFunction, PropsWithoutRef } from 'react';

import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import type { FlattenTreeItem, TreeBaseItem } from '@/types/TreeStructure';

type FlattenSortableItemTreeComponentProps<T extends TreeBaseItem<I>, I extends string = string> = {
    item: FlattenTreeItem<T, I>;
    isDragging: boolean;
    isSorting: boolean;
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
    isDragOverlay?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
};

const flattenSortableItemTreeComponent = <
    R extends HTMLElement,
    T extends TreeBaseItem<I>,
    I extends string = string,
    P extends FlattenSortableItemTreeComponentProps<T, I> = FlattenSortableItemTreeComponentProps<T, I>,
>(
    renderer: ForwardRefRenderFunction<R, PropsWithoutRef<P>>,
) => {
    const Component = forwardRef<R, P>((props, ref) => renderer(props, ref));
    Component.displayName = renderer.displayName || renderer.name || 'FlattenSortableItemTreeComponent';

    return Component;
};

export default flattenSortableItemTreeComponent;
