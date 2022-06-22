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
	const [isDone, setIsDone] = useState(false);

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);

	const dispatch = useDispatch();

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
			<div className={`${styles.todo} ${darkMode && styles['dark-todo']} `}>
				<Fade>
					<div className={styles.left} onClick={completeTodo}>
						<div
							className={`${styles.completedCircle} ${
								isDone && styles.todoDone
							} `}
						>
							{isDone && <DoneIcon className={styles.doneIcon} />}
						</div>

						<p
							className={`${isDone && styles.doneText} ${styles.text} ${
								styles.noselect
							}`}
						>
							{text}
						</p>
					</div>

					<div className={styles.rightIcons}>
						<EditIcon className={styles.expandAndEditIcon} />

						<OpenInFullIcon
							onClick={openModal}
							className={styles.expandAndEditIcon}
						/>

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
