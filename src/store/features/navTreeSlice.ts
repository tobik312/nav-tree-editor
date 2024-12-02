import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { TreeBaseItem, TreeStructure } from '@/types/TreeStructure';

import { addItemToTree, updateTreeItem, deleteTreeItem } from '@/utils/treeUtils';

const initialState: TreeStructure<TreeBaseItem> = [];

const navTreeSlice = createSlice({
    name: 'NavTree',
    initialState,
    reducers: {
        addNavItem: (state, { payload }: PayloadAction<(typeof initialState)[number]>) => {
            return addItemToTree(state, payload);
        },
        editNavItem: (state, { payload }: PayloadAction<TreeBaseItem>) => {
            return updateTreeItem(state, payload);
        },
        deleteNavItem: (state, { payload }: PayloadAction<string>) => {
            return deleteTreeItem(state, payload);
        },
        sortNavItems: (_, { payload }: PayloadAction<TreeStructure<TreeBaseItem>>) => {
            return payload;
        },
    },
});

export const { addNavItem, editNavItem, deleteNavItem, sortNavItems } = navTreeSlice.actions;
export default navTreeSlice.reducer;
