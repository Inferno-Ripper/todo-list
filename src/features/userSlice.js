import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isUserLoggedIn: false,
	user: {
		name: '',
		email: '',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const { login } = userSlice.actions;

export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
