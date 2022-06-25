import { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/darkModeSlice';
import { Fade } from 'react-reveal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';
import { seletIsModalOpen } from './features/modalSlice';
import { login, selectIsUserLoggedIn } from './features/userSlice';
import Login from './components/Login';
import Header from './components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';

function App() {
	// state
	const [todos, setTodos] = useState([]);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	// useEffect
	// useEffect(() => {
	// 	// on reload it checks if the client has previously logged in, if true then client is automatically logged in to that account
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			dispatch(
	// 				login({
	// 					signInProvider: user.providerData[0].providerId,
	// 					user: { name: user.displayName, email: user.email },
	// 				})
	// 			);
	// 		}
	// 	});
	// }, []);

	// functions
	// drag and drop animation
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(todos);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setTodos(items);
	}

	return (
		// IF the theme is set to dark then give the div dark-App className
		<div className={`${styles.app} ${darkMode && styles['dark-app']}`}>
			<Header />

			{/* IF user is not logged in render the  Login Page ELSE render the Home Page*/}
			{!isUserLoggedIn ? (
				<Login />
			) : (
				//  todos
				<div className={styles.content}>
					{/* add a new todo  */}
					<div>
						<AddTodo todos={todos} setTodos={setTodos} />
					</div>

					{/* todo list */}
					<Fade when={todos.length > 0}>
						<div className={styles.todoList}>
							<DragDropContext onDragEnd={handleOnDragEnd}>
								<Droppable droppableId='Todos List'>
									{(provided) => (
										<div
											className={styles.todosContainer}
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
																className={styles.todo}
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
						<div className={styles.todosSort}>
							<TodosSort />
						</div>
					</Fade>
				</div>
			)}
		</div>
	);
}

export default App;
