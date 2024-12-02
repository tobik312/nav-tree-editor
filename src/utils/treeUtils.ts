import type { TreeStructure, TreeBaseItem, TreeStructureItem, FlattenTreeItem } from '@/types/TreeStructure';

//AddItemToTree
export function addItemToTree<T extends TreeBaseItem<I>, I extends string = string>(
    tree: TreeStructure<T, I>,
    newItem: TreeStructureItem<T, I>,
): TreeStructure<T, I> {
    //Default add to root node
    if (newItem.parentId == null) return [...tree, newItem];

    return tree.map((node) => {
        if (node.id == newItem.parentId)
            return {
                ...node,
                children: [...node.children, newItem],
            } as TreeStructureItem<T, I>;

        if (node.children.length > 0)
            return {
                ...node,
                children: addItemToTree(node.children, newItem),
            } as TreeStructureItem<T, I>;

        return node;
    });
}

//UpdateTreeItem
export function updateTreeItem<T extends TreeBaseItem<I>, I extends string = string>(
    tree: TreeStructure<T, I>,
    item: T,
): TreeStructure<T, I> {
    return tree.map((node) => {
        if (node.id == item.id)
            return {
                ...node,
                ...item,
            } as TreeStructureItem<T, I>;

        if (node.children.length > 0)
            return {
                ...node,
                children: updateTreeItem(node.children, item),
            } as TreeStructureItem<T, I>;

        return node;
    });
}

//DeleteTreeItem
export function deleteTreeItem<T extends TreeBaseItem<I>, I extends string = string>(
    tree: TreeStructure<T, I>,
    itemId: I,
): TreeStructure<T, I> {
    return tree
        .map((node) => {
            if (node.children.length > 0)
                return {
                    ...node,
                    children: deleteTreeItem(node.children, itemId),
                } as TreeStructureItem<T, I>;

            return node;
        })
        .filter((node) => node.id !== itemId);
}

//Flatten
function flatten<T extends TreeBaseItem<I>, I extends string = string>(
    tree: TreeStructure<T, I>,
    parentId: T['id'] | null = null,
    depth = 0,
): FlattenTreeItem<T, I>[] {
    return tree.reduce<FlattenTreeItem<T, I>[]>((array, item, index) => {
        // Calculate previous and next sibling IDs
        const prevSibling = index > 0 ? tree[index - 1] : null;
        const nextSibling = index < tree.length - 1 ? tree[index + 1] : null;

        const flattenTreeItem = {
            ...item,
            parentId,
            depth,
            index,
            prevSibling,
            nextSibling,
        } as FlattenTreeItem<T, I>;

        return [...array, flattenTreeItem, ...flatten<T, I>(item.children, item.id, depth + 1)];
    }, []);
}

export function flattenTree<T extends TreeBaseItem<I>, I extends string = string>(tree: TreeStructure<T, I>): FlattenTreeItem<T, I>[] {
    return flatten(tree);
}

//GetProjection
function getMaxDepth<T extends TreeBaseItem<I>, I extends string = string>(previousItem?: FlattenTreeItem<T, I>) {
    return previousItem ? previousItem.depth + 1 : 0;
}

function getMinDepth<T extends TreeBaseItem<I>, I extends string = string>(nextItem?: FlattenTreeItem<T, I>) {
    return nextItem ? nextItem.depth : 0;
}

function getDragDepth(offset: number, indentationWidth: number) {
    return Math.round(offset / indentationWidth);
}

export function getProjection<T extends TreeBaseItem<I>, I extends string = string>(
    items: FlattenTreeItem<T, I>[],
    activeId: I,
    overId: I,
    dragOffset: number,
    indentationWidth: number,
) {
    const overItemIndex = items.findIndex(({ id }) => id === overId);
    const activeItemIndex = items.findIndex(({ id }) => id === activeId);

    const activeItem = items[activeItemIndex];

    const newItems = arrayMove(items, activeItemIndex, overItemIndex);

    const previousItem = newItems?.[overItemIndex - 1];

    let nextItem: FlattenTreeItem<T, I> | undefined = newItems[overItemIndex + 1];
    //Skip childs as next
    if (nextItem && nextItem.parentId == activeItem.id) nextItem = undefined;

    const dragDepth = getDragDepth(dragOffset, indentationWidth);

    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth = getMaxDepth(previousItem);
    const minDepth = getMinDepth(nextItem);

    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
        depth = maxDepth;
    } else if (projectedDepth < minDepth) {
        depth = minDepth;
    }

    return { depth, maxDepth, minDepth, parentId: getParentId() };

    function getParentId() {
        if (depth === 0 || !previousItem) {
            return null;
        }

        if (depth === previousItem.depth) {
            return previousItem.parentId;
        }

        if (depth > previousItem.depth) {
            return previousItem.id;
        }

        const newParent = newItems
            .slice(0, overItemIndex)
            .reverse()
            .find((item) => item.depth === depth)?.parentId;

        return newParent ?? null;
    }
}

//BuildTree
export function buildTreeFromFlatten<T extends TreeBaseItem<I>, I extends string = string>(
    flattenTree: FlattenTreeItem<T, I>[],
): TreeStructure<T, I> {
    type TreeNodesKey = I | 'root';
    const treeNodes = new Map<TreeNodesKey, TreeStructureItem<T, I>[]>();

    flattenTree.forEach((item) => {
        if (!treeNodes.has((item.parentId ?? 'root') as TreeNodesKey)) {
            treeNodes.set((item.parentId ?? 'root') as TreeNodesKey, []);
        }
        treeNodes.set(item.id, []);
    });

    flattenTree.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, parentId, index, depth, nextSibling, prevSibling, ...rest } = item;
        const node = { id, ...rest, children: treeNodes.get(id) ?? [], parentId } as TreeStructureItem<T, I>;

        treeNodes.get((parentId ?? 'root') as TreeNodesKey)?.push(node);
    });

    return treeNodes.get('root') ?? [];
}
