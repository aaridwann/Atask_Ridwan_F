import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import AuthenticationSlice from '../Slice/Authentication/Authentication.slice';
import NotesSlice from '../Slice/Notes/Notes.slice';
import Sagas from '../../Sagas/Sagas';
import customEncryptTransform from '../../Utils/Encrypt/encrypt.utils';

const rootReducer = combineReducers({
	authentication: AuthenticationSlice,
	notes: NotesSlice
});
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
	key: 'key',
	storage: AsyncStorage,
	debug: true,
	whitelist: ['authentication','notes'],
	transforms: [customEncryptTransform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(sagaMiddleware)
});
export const persistor = persistStore(store);

sagaMiddleware.run(Sagas);