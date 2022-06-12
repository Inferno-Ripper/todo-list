import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/AddTodo.css';

// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddTodo = () => {
	const darkMode = useSelector(selectTheme);

	return (
		<div className='addTodo'>
			<form
				className={`${
					darkMode ? 'dark-addTodo__form' : 'light-addTodo__form'
				} addTodo__form`}
			>
				<input type='text' className='addTodo__input' />
				<button type='submit' className='addTodo__button'>
					Submit
				</button>
				<AddCircleIcon />
			</form>
		</div>
	);
};

export default AddTodo;
