import React, { useState } from 'react';
import '../styles/Todo.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import Modal from './Modal';
import { setModalData } from '../features/modalSlice';
import { Fade } from 'react-reveal';
// icons
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import EditIcon from '@mui/icons-material/Edit';

const Todo = ({ text }) => {
	const [isDone, setIsDone] = useState(false);
	const [openTheModal, setOpenTheModal] = useState(false);

	const darkMode = useSelector(selectTheme);

	const dispatch = useDispatch();

	const completeTodo = () => {
		setIsDone((prev) => {
			return !prev;
		});
	};

	const openModal = () => {
		setOpenTheModal(true);
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
			<div className={`${darkMode ? 'dark-todo' : 'light-todo'} todo`}>
				<Fade>
					<div className='todo__left' onClick={completeTodo}>
						<div
							className={`${
								darkMode
									? 'dark-todo__completedCircle'
									: 'light-todo__completedCircle'
							} todo__completedCircle ${
								isDone && darkMode
									? 'dark-todo__done'
									: isDone && 'light-todo__done'
							} todo__done`}
						>
							{isDone && <DoneIcon className='todo__done' />}
						</div>
						<p className={`${isDone && 'todo__doneText'} todo__text noselect`}>
							{text}
						</p>
					</div>

					<div className='todo__rightIcons'>
						<EditIcon className='todo__expandAndEditIcon' />

						<OpenInFullIcon
							onClick={openModal}
							className='todo__expandAndEditIcon'
						/>

						<DeleteIcon
							className={`${
								darkMode ? 'dark-todo__delete' : 'light-todo__delete'
							} todo__delete`}
						/>
					</div>
				</Fade>
			</div>
			{/* every time new todo is added modal would open and close on it's own. using conditional rendering to prevent that bug */}
			{openTheModal && (
				<Modal key={text} isDone={isDone} completeTodo={completeTodo} />
			)}
		</>
	);
};

export default Todo;
