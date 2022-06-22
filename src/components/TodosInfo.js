import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/TodosInfo.module.css';
import TodosSort from './TodosSort';

const TodosInfo = ({ todos }) => {
	const darkMode = useSelector(selectTheme);

	return (
		<div
			className={`${styles.todosInfo} ${darkMode && styles['dark-todosInfo']}`}
		>
			<p className={styles.left}>{todos.length} Todos Remaining</p>

			<div className={styles.todosSort}>
				<TodosSort />
			</div>

			<p className={styles.right}>Clear Completed</p>
		</div>
	);
};

export default TodosInfo;
