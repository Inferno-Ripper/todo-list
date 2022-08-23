import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import { selectIsModalOpen } from '../features/modalSlice';
import { addAllTodos, addTodos } from '../features/todosSlice';
import { selectUser } from '../features/userSlice';
import { colRef } from '../firebase';
import styles from '../styles/TodosSort.module.css';

const TodosSort = ({ setSort, sort }) => {
	// state
	const [allTodos, setAllTodos] = useState([]);
	const [activeTodos, setActiveTodos] = useState([]);
	const [completedTodos, setCompletedTodos] = useState([]);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(selectIsModalOpen);
	const user = useSelector(selectUser);

	// useEffect
	useEffect(() => {
		// get all Todos, todos added by the current user and sort them by the time they were added / descending order
		const getAllTodosQuery = query(
			colRef,
			where('userId', '==', user?.id),
			orderBy('createdAt', 'desc')
		);

		onSnapshot(getAllTodosQuery, (snapshot) => {
			setAllTodos(
				snapshot.docs.map((doc) => {
					return {
						todoId: doc.id,
						data: {
							...doc.data(),
							createdAt: JSON.stringify(doc.data().createdAt),
						},
					};
				})
			);
		});

		// get all Active Todos, todos added by the current user and sort them by the time they were added / descending order
		const getActiveTodosQuery = query(
			colRef,
			where('userId', '==', user?.id),
			where('isDone', '==', false),
			orderBy('createdAt', 'desc')
		);

		onSnapshot(getActiveTodosQuery, (snapshot) => {
			setActiveTodos(
				snapshot.docs.map((doc) => {
					return {
						todoId: doc.id,
						data: {
							...doc.data(),
							createdAt: JSON.stringify(doc.data().createdAt),
						},
					};
				})
			);
		});

		// get all Completed Todos, todos added by the current user and sort them by the time they were added / descending order
		const getCompletedTodosQuery = query(
			colRef,
			where('userId', '==', user?.id),
			where('isDone', '==', true),
			orderBy('createdAt', 'desc')
		);

		onSnapshot(getCompletedTodosQuery, (snapshot) => {
			setCompletedTodos(
				snapshot.docs.map((doc) => {
					return {
						todoId: doc.id,
						data: {
							...doc.data(),
							createdAt: JSON.stringify(doc.data().createdAt),
						},
					};
				})
			);
		});
	}, []);

	useEffect(() => {
		if (sort === 'getAll') {
			dispatch(addTodos(allTodos));
		}
	}, [allTodos]);

	useEffect(() => {
		if (sort === 'getActive') {
			dispatch(addTodos(activeTodos));
		}
	}, [activeTodos]);

	useEffect(() => {
		if (sort === 'getCompleted') {
			dispatch(addTodos(completedTodos));
		}
	}, [completedTodos]);

	useEffect(() => {
		dispatch(addAllTodos(allTodos));
	}, [allTodos]);

	// IF modal is open THEN just RETURN and don't display anything
	if (isModalOpen) return;

	const getAllTodos = () => {
		dispatch(addTodos(allTodos));
		setSort('getAll');
	};

	const getActiveTodos = () => {
		dispatch(addTodos(activeTodos));
		setSort('getActive');
	};

	const getCompletedTodos = () => {
		dispatch(addTodos(completedTodos));
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
