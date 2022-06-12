import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	darkMode: true,
};

const darkModeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		changeTheTheme: (state, { payload }) => {
			state.darkMode = payload;
		},
	},
});

export const { changeTheTheme } = darkModeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode;

export default darkModeSlice.reducer;
