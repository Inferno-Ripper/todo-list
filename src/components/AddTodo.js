import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/AddTodo.module.css';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { colRef } from '../firebase';
// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { selectUser } from '../features/userSlice';

const AddTodo = () => {
	// state
	const [newTodo, setNewTodo] = useState('');

	// redux
	const darkMode = useSelector(selectTheme);
	const user = useSelector(selectUser);

	// functions

	const addTodoToDb = (e) => {
		e.preventDefault();

		// 	// IF input is empty Then don't add a todo
		if (!newTodo) return;

		addDoc(colRef, {
			userId: user.id,
			todo: newTodo,
			isDone: false,
			createdAt: serverTimestamp(),
		});

		setNewTodo('');
	};

	return (
		<div className={`${styles.addTodo} ${darkMode && styles['dark-addTodo']}`}>
			{/* form */}
			<form className={styles.form} onSubmit={addTodoToDb}>
				{/* input */}
				<input
					className={styles.input}
					value={newTodo}
					onChange={(e) => setNewTodo(e.currentTarget.value)}
				/>

				{/* submit button */}
				<button
					type='submit'
					onClick={addTodoToDb}
					className={styles.submitBtn}
				>
					Submit
				</button>

				{/* add icon */}
				{/* <div> */}
				<AddCircleIcon onClick={addTodoToDb} className={styles.addIcon} />
				{/* </div> */}
			</form>
		</div>
	);
};

export default AddTodo;
