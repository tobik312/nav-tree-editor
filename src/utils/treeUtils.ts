import type { TreeStructure, TreeBaseItem, TreeStructureItem } from '@/types/TreeStructure';

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
