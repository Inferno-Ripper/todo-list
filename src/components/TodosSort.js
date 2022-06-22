import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import { seletIsModalOpen } from '../features/modalSlice';
import styles from '../styles/TodosSort.module.css';

const TodosSort = () => {
	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);

	// IF modal is open THEN just RETURN and don't display anything
	if (isModalOpen) return;

	return (
		<div
			className={`${styles.todosSort} ${darkMode && styles['dark-todosSort']} `}
		>
			<p className={(styles.sortAll, styles.sortSeleted)}>All</p>
			<p className={styles.sortActive}>Active</p>
			<p className={styles.sortCompleted}>Completed</p>
		</div>
	);
};

export default TodosSort;
