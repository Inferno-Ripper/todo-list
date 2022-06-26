import React, { useState } from 'react';
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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { colRef } from '../firebase';

const Modal = ({ completeTodo, data, editTodo, setEditTodo }) => {
	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const todoData = useSelector(seletModal);

	// state
	const [editedTodo, setEditedTodo] = useState(todoData.bodyText);

	// functions
	const closeModal = () => {
		dispatch(closeModalRedux());
	};

	const editTodoFunction = () => {
		if (!editedTodo) return;

		setEditTodo((prev) => !prev);
	};

	const submitEditedTodo = (e) => {
		e.preventDefault();

		const docRef = doc(colRef, todoData.todoId);

		updateDoc(docRef, {
			todo: editedTodo,
		});

		dispatch(closeModalRedux());
	};

	const deleteTodoOnModal = () => {
		const docRef = doc(colRef, todoData.todoId);

		deleteDoc(docRef);

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
				<h1 className={styles.status}>{data?.isDone ? 'Done' : 'Not Done'}</h1>

				{/* complete status border */}
				<p
					className={` ${styles.statusBorder} ${
						data?.isDone ? styles.CompletedBorder : styles.NotCompletedBorder
					}`}
				></p>

				{/* close button */}
				<h1 className={styles.closeBtn} onClick={closeModal}>
					X
				</h1>

				{/* body */}
				<div className={styles.body}>
					{/* text */}
					{editTodo ? (
						<form onSubmit={submitEditedTodo}>
							<input
								className={styles.text}
								value={editedTodo}
								onChange={(e) => setEditedTodo(e.target.value)}
							/>
						</form>
					) : (
						<input disabled className={styles.text} value={todoData.bodyText} />
					)}
				</div>

				{/* edit icon */}
				<div
					className={`${styles.editIcon} ${editTodo && styles.editIconActive}`}
				>
					<EditIcon style={{ fontSize: '25px' }} onClick={editTodoFunction} />
				</div>
			</div>

			{/* footer */}

			<div className={styles.footer}>
				{/* buttons */}

				{editTodo ? (
					// edit button
					<button
						className={`${styles.submitBtn} ${styles.btn}`}
						onClick={submitEditedTodo}
					>
						Submit
					</button>
				) : (
					//  complete button
					<button
						className={`${styles.completeBtn} ${styles.btn}`}
						onClick={completeTodo}
					>
						{!data?.isDone ? 'Complete' : 'Incomplete'}
					</button>
				)}

				{/* delete button */}
				<button
					className={`${styles.deleteBtn} ${styles.btn}`}
					onClick={deleteTodoOnModal}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
export default Modal;
