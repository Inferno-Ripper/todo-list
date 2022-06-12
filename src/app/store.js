import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/darkModeSlice';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
	},
});
