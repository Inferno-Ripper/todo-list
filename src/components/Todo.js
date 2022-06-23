import React, { useState } from 'react';
import styles from '../styles/Todo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import Modal from './Modal';
import { seletIsModalOpen, setModalData } from '../features/modalSlice';
import { Fade } from 'react-reveal';
// icons
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';

const Todo = ({ text }) => {
	// state
	const [isDone, setIsDone] = useState(false);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);

	// functions
	const completeTodo = () => {
		setIsDone((prev) => {
			return !prev;
		});
	};

	const openModal = () => {
		dispatch(
			setModalData({
				bodyText: text,
				completeStatus: isDone,
				todoId: '124',
			})
		);
	};

	return (
		<>
			{/* todo */}
			<div className={`${styles.todo} ${darkMode && styles['dark-todo']} `}>
				<Fade>
					{/* left */}
					<div className={styles.left} onClick={completeTodo}>
						{/* completed circle */}
						<div
							className={`${styles.completedCircle} ${
								isDone && styles.todoDone
							} `}
						>
							{isDone && <DoneIcon />}
						</div>

						{/* text */}
						<p
							className={`${isDone && styles.doneText} ${styles.text} ${
								styles.noselect
							}`}
						>
							{text}
						</p>
					</div>

					{/* right icons */}
					<div className={styles.rightIcons}>
						{/* expand and edit icon */}

						{/* edit icon  */}
						<EditIcon className={styles.expandAndEditIcon} />

						{/* expand icon */}
						<OpenInFullIcon
							onClick={openModal}
							className={styles.expandAndEditIcon}
						/>

						{/* delete icon */}
						<DeleteIcon className={styles.deleteIcon} />
					</div>
				</Fade>
			</div>

			{isModalOpen && (
				<Modal key={text} isDone={isDone} completeTodo={completeTodo} />
			)}
		</>
	);
};

export default Todo;
