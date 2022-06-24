import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isUserLoggedIn: false,
	signInProvider: null,
	user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.isUserLoggedIn = true;
			state.signInProvider = payload.signInProvider;
			state.user = payload.user;
		},

		logoutRedux: (state) => {
			state.isUserLoggedIn = false;
			state.signInProvider = null;
			state.user = null;
		},
	},
});

export const { login, logoutRedux } = userSlice.actions;

export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn;
export const selectUser = (state) => state.user.user;
export const selectSignInProvider = (state) => state.user.signInProvider;

export default userSlice.reducer;
