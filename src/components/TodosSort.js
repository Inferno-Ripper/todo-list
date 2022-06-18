import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import { seletIsModalOpen } from '../features/modalSlice';
import '../styles/TodosSort.css';

const TodosSort = () => {
	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);

	// IF modal is open THEN just RETURN and don't display anything
	if (isModalOpen) return;

	return (
		<div
			className={`${darkMode ? 'dark-todosSort' : 'light-todosSort'} todosSort`}
		>
			<p className='todosSort__all todosSort__seleted'>All</p>
			<p className='todosSort__active'>Active</p>
			<p className='todosSort__completed'>Completed</p>
		</div>
	);
};

export default TodosSort;
