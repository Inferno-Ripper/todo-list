import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	todosList: [],
	allTodos: [],
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodos: (state, { payload }) => {
			state.todosList = payload;
		},

		addAllTodos: (state, { payload }) => {
			state.allTodos = payload;
		},
	},
});

export const { addTodos, addAllTodos } = todosSlice.actions;

export const selectTodosList = (state) => state.todos.todosList;
export const selectAllTodos = (state) => state.todos.allTodos;

export default todosSlice.reducer;
