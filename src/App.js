import react, { useState } from 'react';
import styles from './styles/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './features/darkModeSlice';
import { Fade } from 'react-reveal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';
import { seletIsModalOpen } from './features/modalSlice';
import { selectIsUserLoggedIn } from './features/userSlice';
import Login from './components/Login';
import Header from './components/Header';

function App() {
	const [todos, setTodos] = useState([]);

	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(todos);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setTodos(items);
	}

	return (
		// IF the theme is set to dark then give the div dark-App className ELSE give the div light-App className
		<div className={`${styles.app} ${darkMode && styles['dark-app']}`}>
			<Header />

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
											className={styles.todos}
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
						<div className={styles.todosInfo}>
							<TodosSort />
						</div>
					</Fade>
				</div>
			)}
		</div>
	);
}

export default App;
