import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/AddTodo.css';
// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddTodo = ({ todos, setTodos }) => {
	const [newTodo, setNewTodo] = useState('');

	const darkMode = useSelector(selectTheme);

	const addNewTodo = (e) => {
		e.preventDefault();

		// IF input is empty Then don't add a todo
		if (!newTodo) return;

		setTodos((prevValue) => [
			...prevValue,
			{ bodyText: newTodo, completeStatus: false, todoId: '124' },
		]);

		setNewTodo('');
	};

	return (
		<div className='addTodo'>
			<form
				className={`${
					darkMode ? 'dark-addTodo__form' : 'light-addTodo__form'
				} addTodo__form`}
			>
				<input
					className='addTodo__input'
					value={newTodo}
					onChange={(e) => setNewTodo(e.currentTarget.value)}
				/>
				<button type='submit' onClick={addNewTodo} className='addTodo__button'>
					Submit
				</button>
				<AddCircleIcon onClick={addNewTodo} />
			</form>
		</div>
	);
};

export default AddTodo;
