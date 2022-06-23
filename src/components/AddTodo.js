import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/AddTodo.module.css';
// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddTodo = ({ setTodos }) => {
	// state
	const [newTodo, setNewTodo] = useState('');

	// redux
	const darkMode = useSelector(selectTheme);

	// functions
	const addNewTodo = (e) => {
		e.preventDefault();

		// IF input is empty Then don't add a todo
		if (!newTodo) return;

		setTodos((prevValue) => [
			...prevValue,
			{ bodyText: newTodo, completeStatus: false, todoId: '123' },
		]);

		setNewTodo('');
	};

	return (
		<div className={`${styles.addTodo} ${darkMode && styles['dark-addTodo']}`}>
			{/* form */}
			<form className={styles.form}>
				{/* input */}
				<input
					className={styles.input}
					value={newTodo}
					onChange={(e) => setNewTodo(e.currentTarget.value)}
				/>

				{/* submit button */}
				<button type='submit' onClick={addNewTodo} className={styles.submitBtn}>
					Submit
				</button>

				{/* add icon */}
				<div className={styles.addIcon}>
					<AddCircleIcon onClick={addNewTodo} />
				</div>
			</form>
		</div>
	);
};

export default AddTodo;
