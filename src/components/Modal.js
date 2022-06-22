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
	const darkMode = useSelector(selectTheme);

	const dispatch = useDispatch();

	const isModalOpen = useSelector(seletIsModalOpen);
	const todoData = useSelector(seletModal);

	const closeModal = () => {
		dispatch(closeModalRedux());
	};

	return (
		<div
			className={`${styles.modal} ${darkMode && styles['dark-modal']} ${
				isModalOpen ? styles.show__modal : styles.hide__modal
			} `}
		>
			<div className={styles.header}>
				<h1 className={styles.status}>{isDone ? 'Done' : 'Not Done'}</h1>

				<p
					className={` ${styles.statusBorder} ${
						isDone ? styles.CompletedBorder : styles.NotCompletedBorder
					}`}
				></p>
				<h1 className={styles.closeBtn} onClick={closeModal}>
					X
				</h1>
				<div className={styles.body}>
					<p className={styles.text}>{todoData.bodyText}</p>
				</div>

				<div className={styles.editIcon}>
					<EditIcon style={{ fontSize: '25px' }} />
				</div>
			</div>

			<div className={styles.footer}>
				<button
					className={`${styles.completeBtn} ${styles.btn}`}
					onClick={completeTodo}
				>
					{!isDone ? 'Complete' : 'Incomplete'}
				</button>

				<button className={`${styles.deleteBtn} ${styles.btn}`}>Delete</button>
			</div>
		</div>
	);
};
export default Modal;
