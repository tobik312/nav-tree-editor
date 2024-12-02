import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { TreeStructure } from '@/types/TreeStructure';
import type { NavTreeItem } from '@/types/NavItem';

import { addItemToTree, updateTreeItem, deleteTreeItem } from '@/utils/treeUtils';

const initialState: TreeStructure<NavTreeItem> = [];

const navTreeSlice = createSlice({
    name: 'NavTree',
    initialState,
    reducers: {
        addNavItem: (state, { payload }: PayloadAction<(typeof initialState)[number]>) => {
            return addItemToTree(state, payload);
        },
        editNavItem: (state, { payload }: PayloadAction<NavTreeItem>) => {
            return updateTreeItem(state, payload);
        },
        deleteNavItem: (state, { payload }: PayloadAction<string>) => {
            return deleteTreeItem(state, payload);
        },
        sortNavItems: (_, { payload }: PayloadAction<TreeStructure<NavTreeItem>>) => {
            return payload;
        },
    },
});

export const { addNavItem, editNavItem, deleteNavItem, sortNavItems } = navTreeSlice.actions;
export default navTreeSlice.reducer;
