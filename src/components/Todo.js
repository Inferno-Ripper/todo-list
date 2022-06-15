import React, { useState } from 'react';
import '../styles/Todo.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';

// icons
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Modal from './Modal';
import { setModalData } from '../features/modalSlice';
import { Fade } from 'react-reveal';

const Todo = ({ text }) => {
	const [isCompleted, setIsCompleted] = useState(false);
	const [openTheModal, setOpenTheModal] = useState(false);

	const darkMode = useSelector(selectTheme);

	const dispatch = useDispatch();

	const completeTodo = () => {
		setIsCompleted((prev) => {
			return !prev;
		});
	};

	const openModal = () => {
		setOpenTheModal(true);
		dispatch(
			setModalData({
				bodyText: text,
				completeStatus: isCompleted,
				todoId: '124',
			})
		);
	};

	return (
		<>
			<div
				className={`${darkMode ? 'dark-todo' : 'light-todo'} todo`}
				onClick={completeTodo}
			>
				<Fade>
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
							onClick={completeTodo}
							className={`${
								isCompleted && 'todo__completedText'
							} todo__text noselect`}
						>
							{text}
						</p>
					</div>

					<div className='todo__rightIcons'>
						<OpenInFullIcon onClick={openModal} className='todo__expandIcon' />

						<DeleteIcon
							className={`${
								darkMode ? 'dark-todo__delete' : 'light-todo__delete'
							} todo__delete`}
						/>
					</div>
				</Fade>
			</div>

			{/* every time new todo is added modal would open and close on it's own. using conditional rendering to prevent that bug */}
			{openTheModal && <Modal key={text} isCompleted={isCompleted} />}
		</>
	);
};

export default Todo;
