import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Modal.module.css';
import {
	changeModalCompleteStatus,
	closeModalRedux,
	selectIsModalOpen,
	selectModal,
} from '../features/modalSlice';
// icons
import EditIcon from '@mui/icons-material/Edit';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { colRef } from '../firebase';
import { toast } from 'react-toastify';
import { Bounce, Fade, Zoom } from 'react-reveal';

const Modal = () => {
	// state
	const [editTodo, setEditTodo] = useState(false);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(selectIsModalOpen);
	const todoData = useSelector(selectModal);

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

		if (editedTodo === todoData.bodyText) {
			setEditTodo(false);
			return;
		}

		const docRef = doc(colRef, todoData?.todoId);

		updateDoc(docRef, {
			todo: editedTodo,
		}).then(() => {
			toast.success('Todo Changed');
		});

		dispatch(closeModalRedux());
	};

	const deleteTodoOnModal = () => {
		const docRef = doc(colRef, todoData?.todoId);

		deleteDoc(docRef);

		dispatch(closeModalRedux());
	};

	const completedTodoOnModal = () => {
		const docRef = doc(colRef, todoData?.todoId);

		getDoc(docRef).then((doc) => {
			dispatch(changeModalCompleteStatus(doc.data().isDone));
		});

		updateDoc(docRef, {
			isDone: todoData?.completeStatus ? false : true,
		});
	};

	return (
		<>
			<Fade>
				{/* modal */}
				<div
					className={`${styles.modal} ${darkMode && styles['dark-modal']} ${
						isModalOpen ? styles.show__modal : styles.hide__modal
					} `}
				>
					{/* header */}
					<div className={styles.header}>
						{/* complete status */}
						<h1 className={styles.status}>
							{todoData?.completeStatus ? 'Done' : 'Not Done'}

							{/* complete status border */}
							<p
								className={` ${styles.statusBorder} ${
									todoData?.completeStatus
										? styles.CompletedBorder
										: styles.NotCompletedBorder
								}`}
							></p>
						</h1>
						{/* close button */}
						<h1 className={styles.closeBtn} onClick={closeModal}>
							X
						</h1>
					</div>

					{/* edit icon */}
					<div
						className={`${styles.editIcon} ${
							editTodo && styles.editIconActive
						}`}
					>
						<EditIcon onClick={editTodoFunction} />
					</div>

					{/* body */}
					<div className={styles.body}>
						{/* text */}
						{editTodo ? (
							<form
								onSubmit={submitEditedTodo}
								className={styles.textContainer}
							>
								<textarea
									autoFocus
									className={styles.text}
									value={editedTodo}
									onChange={(e) => setEditedTodo(e.target.value)}
								/>
							</form>
						) : (
							<div onClick={editTodoFunction} className={styles.textContainer}>
								<textarea
									disabled
									className={styles.text}
									value={todoData.bodyText}
								/>
							</div>
						)}
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
								onClick={completedTodoOnModal}
							>
								{!todoData?.completeStatus ? 'Complete' : 'Incomplete'}
							</button>
						)}

						{editTodo ? (
							// cancel button
							<button
								className={`${styles.cancelBtn} ${styles.btn}`}
								onClick={() => setEditTodo(false)}
							>
								cancel
							</button>
						) : (
							// delete button
							<button
								className={`${styles.deleteBtn} ${styles.btn}`}
								onClick={deleteTodoOnModal}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</Fade>
		</>
	);
};
export default Modal;
