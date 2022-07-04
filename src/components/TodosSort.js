import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import { seletIsModalOpen } from '../features/modalSlice';
import { addTodos } from '../features/todosSlice';
import { selectUser } from '../features/userSlice';
import { colRef } from '../firebase';
import styles from '../styles/TodosSort.module.css';

const TodosSort = ({ setSort, sort, setTodos }) => {
	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const user = useSelector(selectUser);

	useEffect(() => {
		getAllTodos();
	}, []);

	// IF modal is open THEN just RETURN and don't display anything
	if (isModalOpen) return;

	const getAllTodos = () => {
		// get all Active Todos, todos added by the current user and sort them by the time they were added / ascending order
		const q = query(
			colRef,
			where('userId', '==', user?.id),
			orderBy('createdAt', 'desc')
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

		setSort('getAll');
	};

	const getActiveTodos = () => {
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

		setSort('getActive');
	};

	const getCompletedTodos = () => {
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

		setSort('getCompleted');
	};

	return (
		// todos sort
		<div
			className={`${styles.todosSort} ${darkMode && styles['dark-todosSort']} `}
		>
			<p
				className={
					(styles.sortAll, sort === 'getAll' ? styles.sortSeleted : '')
				}
				onClick={getAllTodos}
			>
				All
			</p>
			<p
				className={
					(styles.sortActive, sort === 'getActive' ? styles.sortSeleted : '')
				}
				onClick={getActiveTodos}
			>
				Active
			</p>
			<p
				className={
					(styles.sortCompleted,
					sort === 'getCompleted' ? styles.sortSeleted : '')
				}
				onClick={getCompletedTodos}
			>
				Completed
			</p>
		</div>
	);
};

export default TodosSort;
