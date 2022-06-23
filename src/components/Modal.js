import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Modal.module.css';
import {
	closeModalRedux,
	seletIsModalOpen,
	seletModal,
} from '../features/modalSlice';
// icons
import EditIcon from '@mui/icons-material/Edit';

const Modal = ({ completeTodo, isDone }) => {
	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const todoData = useSelector(seletModal);

	// functions
	const closeModal = () => {
		dispatch(closeModalRedux());
	};

	return (
		// modal
		<div
			className={`${styles.modal} ${darkMode && styles['dark-modal']} ${
				isModalOpen ? styles.show__modal : styles.hide__modal
			} `}
		>
			{/* header */}
			<div className={styles.header}>
				{/* complete status */}
				<h1 className={styles.status}>{isDone ? 'Done' : 'Not Done'}</h1>

				{/* complete status border */}
				<p
					className={` ${styles.statusBorder} ${
						isDone ? styles.CompletedBorder : styles.NotCompletedBorder
					}`}
				></p>

				{/* close button */}
				<h1 className={styles.closeBtn} onClick={closeModal}>
					X
				</h1>

				{/* body */}
				<div className={styles.body}>
					{/* text */}
					<p className={styles.text}>{todoData.bodyText}</p>
				</div>

				{/* edit icon */}
				<div className={styles.editIcon}>
					<EditIcon style={{ fontSize: '25px' }} />
				</div>
			</div>

			{/* footer */}

			<div className={styles.footer}>
				{/* buttons */}
				{/* complete button */}
				<button
					className={`${styles.completeBtn} ${styles.btn}`}
					onClick={completeTodo}
				>
					{!isDone ? 'Complete' : 'Incomplete'}
				</button>

				{/* delete button */}
				<button className={`${styles.deleteBtn} ${styles.btn}`}>Delete</button>
			</div>
		</div>
	);
};
export default Modal;
