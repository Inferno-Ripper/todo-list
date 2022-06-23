import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/TodosInfo.module.css';
import TodosSort from './TodosSort';

const TodosInfo = ({ todos }) => {
	// redux
	const darkMode = useSelector(selectTheme);

	return (
		// todo information
		<div
			className={`${styles.todosInfo} ${darkMode && styles['dark-todosInfo']}`}
		>
			<p className={styles.left}>{todos.length} Todos Remaining</p>

			{/* todos sort */}
			<div className={styles.todosSort}>
				<TodosSort />
			</div>

			<p>Clear Completed</p>
		</div>
	);
};

export default TodosInfo;
