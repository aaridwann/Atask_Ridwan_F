import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		SET_AUTH: (state, action) => {
			return ({...state, isAuth: true, ...action.payload});
		},
		CLEAR_AUTH: () => initialState
	}
});

export const { SET_AUTH, CLEAR_AUTH } = authenticationSlice.actions;

export default authenticationSlice.reducer;