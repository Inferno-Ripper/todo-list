import React, { useState } from 'react';
import '../styles/Todo.css';

// icons
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';

const Todo = () => {
	const [isCompleted, setIsCompleted] = useState(false);

	const darkMode = useSelector(selectTheme);

	const completeTodo = () => {
		setIsCompleted((prev) => {
			return !prev;
		});
	};

	return (
		<div
			className={`${darkMode ? 'dark-todo' : 'light-todo'} todo`}
			onClick={completeTodo}
		>
			<div className='todo__left' onClick={completeTodo}>
				<div
					onClick={completeTodo}
					className={`${
						darkMode
							? 'dark-todo__completedCircle'
							: 'light-todo__completedCircle'
					} todo__completedCircle ${
						isCompleted && darkMode
							? 'dark-todo__completed'
							: isCompleted && 'light-todo__completed'
					} todo__completed`}
				>
					{isCompleted && <DoneIcon className='todo__completed' />}
				</div>
				<p
					className={`${
						isCompleted && 'todo__completedText'
					} todo__text noselect`}
				>
					text
				</p>
			</div>
			<DeleteIcon
				className={`${
					darkMode ? 'dark-todo__delete' : 'light-todo__delete'
				} todo__delete`}
			/>
		</div>
	);
};

export default Todo;
