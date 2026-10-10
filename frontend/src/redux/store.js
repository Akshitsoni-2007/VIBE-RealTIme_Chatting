import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storageModule from 'redux-persist/lib/storage';
const storage = storageModule.default || storageModule;

import userReducer from './userSlice.js';
import messageReducer from './messageSlice.js';
import socketReducer from './socketSlice.js';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user'],
    blacklist: ['socket', 'message'],
};

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
});

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    'socket/setSocket',
                ],
                ignoredPaths: ['socket.socket'],
            },
        }),
});

export const persistor = persistStore(store);

export default store;