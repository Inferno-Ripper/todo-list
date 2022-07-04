import React, { useState } from 'react';
import styles from '../styles/Todo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import Modal from './Modal';
import { seletIsModalOpen, setModalData } from '../features/modalSlice';
import { Fade } from 'react-reveal';
// icons
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';
import { colRef } from '../firebase';
import {
	deleteDoc,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { addTodos } from '../features/todosSlice';
import { selectUser } from '../features/userSlice';

const Todo = ({ todoId, data, sort }) => {
	// state
	const [editTodo, setEditTodo] = useState(false);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const user = useSelector(selectUser);

	// functions
	const completeTodo = () => {
		const docRef = doc(colRef, todoId);

		updateDoc(docRef, {
			isDone: data.isDone ? false : true,
		});

		if (sort === 'getAll') {
			// get all Active Todos, todos added by the current user and sort them by the time they were added / ascending order
			const q = query(colRef, where('userId', '==', user?.id));

			onSnapshot(q, (snapshot) => {
				dispatch(
					addTodos(
						snapshot.docs.map((doc) => {
							return { todoId: doc.id, data: doc.data() };
						})
					)
				);
			});
		} else if (sort === 'getActive') {
			// get all Active Todos, todos added by the current user and sort them by the time they were added / ascending order
			const q = query(
				colRef,
				where('userId', '==', user?.id),
				where('isDone', '==', false)
			);

			onSnapshot(q, (snapshot) => {
				dispatch(
					addTodos(
						snapshot.docs.map((doc) => {
							return { todoId: doc.id, data: doc.data() };
						})
					)
				);
			});
		} else if (sort === 'getCompleted') {
			// get all Active Todos, todos added by the current user and sort them by the time they were added / ascending order
			const q = query(
				colRef,
				where('userId', '==', user?.id),
				where('isDone', '==', true)
			);

			onSnapshot(q, (snapshot) => {
				dispatch(
					addTodos(
						snapshot.docs.map((doc) => {
							return { todoId: doc.id, data: doc.data() };
						})
					)
				);
			});
		}
	};

	const openModal = () => {
		dispatch(
			setModalData({
				bodyText: data.todo,
				completeStatus: data.isDone,
				todoId: todoId,
			})
		);
	};

	const deleteTodo = () => {
		const docRef = doc(colRef, todoId);

		deleteDoc(docRef);
	};

	return (
		<>
			{/* todo */}
			<div className={`${styles.todo} ${darkMode && styles['dark-todo']} `}>
				<Fade>
					{/* left */}
					<div className={styles.left} onClick={completeTodo}>
						{/* completed circle */}
						<div
							className={`${styles.completedCircle} ${
								data?.isDone && styles.todoDone
							} `}
						>
							{data?.isDone && <DoneIcon />}
						</div>

						{/* text */}
						<p
							className={`${data?.isDone && styles.doneText} ${styles.text} ${
								styles.noselect
							}`}
						>
							{data?.todo}
						</p>
					</div>

					{/* right icons */}
					<div className={styles.rightIcons}>
						{/* expand and edit icon */}

						{/* edit icon  */}
						<EditIcon
							className={styles.expandAndEditIcon}
							onClick={() => {
								openModal();
								setEditTodo(true);
							}}
						/>

						{/* expand icon */}
						<OpenInFullIcon
							onClick={openModal}
							className={styles.expandAndEditIcon}
						/>

						{/* delete icon */}
						<DeleteIcon className={styles.deleteIcon} onClick={deleteTodo} />
					</div>
				</Fade>
			</div>

			{isModalOpen && (
				<Modal
					key={todoId}
					todoId={todoId}
					completeTodo={completeTodo}
					data={data}
					editTodo={editTodo}
					setEditTodo={setEditTodo}
					deleteTodo={deleteTodo}
				/>
			)}
		</>
	);
};

export default Todo;
