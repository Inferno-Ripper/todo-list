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
			{ payload: { isModalOpen, completeStatus, bodyText, todoId } }
		) => {
			state.isModalOpen = true;
			state.todoData.todoId = todoId;
			state.todoData.completeStatus = completeStatus;
			state.todoData.bodyText = bodyText;
		},

		closeModalRedux: (state) => {
			state.isModalOpen = false;
		},
	},
});

export const { setModalData, closeModalRedux } = modalSlice.actions;

export const seletIsModalOpen = (state) => state.modal.isModalOpen;
export const seletModal = (state) => state.modal.todoData;

export default modalSlice.reducer;
