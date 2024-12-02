export type TreeBaseItem<I = string> = {
    id: I;
};

export type TreeStructureItem<T extends TreeBaseItem<I>, I extends string = string> = T & {
    parentId: I | null;
    children: TreeStructureItem<T, I>[];
};

export type TreeStructure<T extends TreeBaseItem<I>, I extends string = string> = TreeStructureItem<T, I>[];
