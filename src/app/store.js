import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/darkModeSlice';
import modalReducer from '../features/modalSlice';
import userReducer from '../features/userSlice';
import todosReducer from '../features/todosSlice';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		modal: modalReducer,
		user: userReducer,
		todos: todosReducer,
	},
});
