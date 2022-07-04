import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	todosList: [],
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodos: (state, { payload }) => {
			state.todosList = payload;
		},
	},
});

export const { addTodos } = todosSlice.actions;

export const selectTodosList = (state) => state.todos.todosList;

export default todosSlice.reducer;
