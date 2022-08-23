import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
	todoData: {
		todoId: '',
		completeStatus: false,
		bodyText: '',
	},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalData: (
			state,
			{ payload: { completeStatus, bodyText, todoId } }
		) => {
			state.isModalOpen = true;
			state.todoData.todoId = todoId;
			state.todoData.completeStatus = completeStatus;
			state.todoData.bodyText = bodyText;
		},

		changeModalCompleteStatus: (state, { payload }) => {
			state.todoData.completeStatus = payload;
		},

		openModalRedux: (state) => {
			state.isModalOpen = true;
		},

		closeModalRedux: (state) => {
			state.isModalOpen = false;
		},
	},
});

export const {
	setModalData,
	openModalRedux,
	closeModalRedux,
	changeModalCompleteStatus,
} = modalSlice.actions;

export const selectIsModalOpen = (state) => state.modal.isModalOpen;
export const selectModal = (state) => state.modal.todoData;

export default modalSlice.reducer;
