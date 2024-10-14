import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './services/api';
import authSlice from '@/store/authSlice';
import themeConfigSlice from '@/store/themeConfigSlice';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth: authSlice,
            themeConfig: themeConfigSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
        ...options,
    });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type IRootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
