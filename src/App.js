import react, { useEffect, useState } from 'react';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheTheme, selectTheme } from './features/darkModeSlice';
import { Fade } from 'react-reveal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';
import UserInfo from './components/UserInfo';
import { seletIsModalOpen } from './features/modalSlice';
import { selectIsUserLoggedIn, selectUser } from './features/userSlice';
import Login from './components/Login';

function App() {
	const [todos, setTodos] = useState([]);

	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	const changeTheme = () => {
		// IF darkmode is True set it to False ELSE set it to True
		dispatch(changeTheTheme(darkMode === true ? false : true));
	};

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(todos);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setTodos(items);
	}

	return (
		// IF the theme is set to dark then give the div dark-App className ELSE give the div light-App className
		<div className={`${darkMode ? 'dark-App' : 'light-App'} App`}>
			<div className='App__topRight'>
				<div className='App__themeIcon' onClick={changeTheme}>
					{/* IF darkMode is True display the  LightModeIcon ELSE display the DarkModeIcon*/}
					{darkMode ? (
						<LightModeIcon style={{ color: 'white' }} />
					) : (
						<DarkModeIcon style={{ color: 'black' }} />
					)}
				</div>

				{isUserLoggedIn && (
					<div className='App__userInfo'>
						<UserInfo />
					</div>
				)}
			</div>

			<h1 className='App__todoListText'>Todo List</h1>

			{!isUserLoggedIn ? (
				<Login />
			) : (
				//  todos
				<div className='App__content'>
					{/* add a new todo  */}
					<div>
						<AddTodo todos={todos} setTodos={setTodos} />
					</div>

					{/* todo list */}
					<Fade when={todos.length > 0}>
						<div
							className={`${
								darkMode ? 'dark-App__todoList' : 'light-App__todoList'
							} App__todoList`}
						>
							<DragDropContext onDragEnd={handleOnDragEnd}>
								<Droppable droppableId='Todos List'>
									{(provided) => (
										<div
											className='App__todos'
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{todos.map(({ bodyText }, index) => {
												return (
													<Draggable
														key={index}
														index={index}
														draggableId={`'${index}'`}
														isDragDisabled={isModalOpen}
													>
														{(provided) => (
															<div
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
																className={`${
																	darkMode
																		? 'dark-App__todo'
																		: 'light-App__todo'
																} App__todo`}
															>
																<Todo text={bodyText} />
															</div>
														)}
													</Draggable>
												);
											})}

											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>

							{/* todo info */}
							<TodosInfo todos={todos} />
						</div>

						{/* todo sort */}
						<div className='App__todosInfo'>
							<TodosSort />
						</div>
					</Fade>
				</div>
			)}
		</div>
	);
}

export default App;
