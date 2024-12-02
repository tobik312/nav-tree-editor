import { configureStore } from '@reduxjs/toolkit';

import navTreeReducer from './features/navTreeSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            navTree: navTreeReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
