import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/darkModeSlice';
import modalReducer from '../features/modalSlice';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		modal: modalReducer,
	},
});
