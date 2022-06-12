import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/TodosInfo.css';
import TodosSort from './TodosSort';

const TodosInfo = () => {
	const darkMode = useSelector(selectTheme);

	return (
		<div
			className={`${darkMode ? 'dark-todosInfo' : 'light-todosInfo'} todosInfo`}
		>
			<p className='todosInfo__left'>5 Todos Remaining</p>

			<div className='todosInfo__todosSort'>
				<TodosSort />
			</div>

			<p className='todosInfo__right'>Clear Completed</p>
		</div>
	);
};

export default TodosInfo;
