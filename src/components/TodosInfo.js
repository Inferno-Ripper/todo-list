import { onAuthStateChanged } from 'firebase/auth';
import {
	deleteDoc,
	getDocs,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import { auth, colRef } from '../firebase';
import styles from '../styles/TodosInfo.module.css';
import TodosSort from './TodosSort';
import { toast } from 'react-toastify';

const TodosInfo = ({ sort, setSort }) => {
	const [remainingTodos, setRemainingTodos] = useState(0);

	// redux
	const darkMode = useSelector(selectTheme);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const q = query(
				colRef,
				where('userId', '==', user?.uid),
				where('isDone', '==', false)
			);

			onSnapshot(q, (snapshot) => {
				setRemainingTodos(
					snapshot.docs.map((doc) => {
						return { todoId: doc.id, data: doc.data() };
					})
				);
			});
		});
	}, []);

	const clearCompletedTodos = async () => {
		const q = query(
			colRef,
			where('userId', '==', auth?.currentUser.uid),
			where('isDone', '==', true)
		);

		const querySnapshot = await getDocs(
			query(colRef, where('isDone', '==', true))
		);

		const completedTodos = [];

		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			completedTodos.push({ todoId: doc.id, data: doc.data() });
		});

		if (completedTodos.length >= 1) {
			getDocs(q).then((snapshot) => {
				snapshot.docs.map((doc) => {
					deleteDoc(doc.ref);
				});
				toast.success('Completed Todos Cleared');
			});
		}
	};

	return (
		// todo information
		<>
			<div
				className={`${styles.todosInfo} ${
					darkMode && styles['dark-todosInfo']
				}`}
			>
				<p className={styles.left}>
					{remainingTodos.length}{' '}
					{remainingTodos.length <= 1 ? 'Todo Remaining' : 'Todos Remaining'}
				</p>

				{/* todos sort */}
				<div className={styles.todosSort}>
					<TodosSort sort={sort} setSort={setSort} />
				</div>

				<p onClick={clearCompletedTodos}>Clear Completed</p>
			</div>
		</>
	);
};

export default TodosInfo;
