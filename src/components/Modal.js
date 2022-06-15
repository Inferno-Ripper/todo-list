import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/Modal.css';
import {
	closeModalRedux,
	seletIsModalOpen,
	seletModal,
} from '../features/modalSlice';

const Modal = () => {
	const darkMode = useSelector(selectTheme);

	const dispatch = useDispatch();

	const isModalOpen = useSelector(seletIsModalOpen);
	const todoData = useSelector(seletModal);

	const closeModal = () => {
		dispatch(closeModalRedux());
	};

	return (
		<div
			className={`${darkMode ? 'dark-modal' : 'light-modal'} ${
				isModalOpen ? 'show__modal' : 'hide__modal'
			} modal`}
		>
			<div className='modalHeader'>
				<h1 className='modalStatus'>
					{todoData.completedStatus ? 'Completed' : 'Not Completed'}
				</h1>
				<h1 className='modalCloseBtn' onClick={closeModal}>
					X
				</h1>
				<div className='modalBody'>
					<p className='modalBodyText'>{todoData.bodyText}</p>
				</div>
			</div>

			<div className='modalFooter'>
				<button
					className={`${
						darkMode ? 'dark-modalBtn' : 'light-modalBtn'
					} modalCompleteBtn modalBtn`}
				>
					Complete
				</button>
				<button
					className={`${
						darkMode ? 'dark-modalBtn' : 'light-modalBtn'
					} modalDeleteBtn modalBtn`}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
export default Modal;
