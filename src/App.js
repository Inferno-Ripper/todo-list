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
import { login, selectIsUserLoggedIn, selectUser } from './features/userSlice';
import Login from './components/Login';
import Header from './components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth, colRef } from './firebase';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { addTodos, selectTodosList } from './features/todosSlice';

function App() {
	// state
	// const [todos, setTodos] = useState([]);
	const [updatedTodos, setUpdatedTodos] = useState(null);
	const [sort, setSort] = useState('getAll');

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isModalOpen = useSelector(seletIsModalOpen);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
	const todosList = useSelector(selectTodosList);
	const user = useSelector(selectUser);

	// useEffect
	useEffect(() => {
		setUpdatedTodos(todosList);
	}, [todosList]);

	useEffect(() => {
		// on reload it checks if the client has previously logged in, if true then client is automatically logged in to that account
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				dispatch(
					login({
						signInProvider: user.providerData[0].providerId,
						user: {
							name: displayName,
							email: email,
							photo: photoURL,
							id: uid,
						},
					})
				);
			}
		});
	}, []);

	useEffect(() => {
		if (user) {
			const q = query(colRef, where('userId', '==', user?.id));

			onSnapshot(q, (snapshot) => {
				dispatch(
					addTodos(
						snapshot.docs.map((doc) => {
							return { todoId: doc.id, data: doc.data() };
						})
					)
				);
			});
		}
	}, []);

	// functions
	// drag and drop animation
	const reorder = (tasks, sourceIndex, destinationIndex) => {
		const result = [...tasks];
		const [reordereditem] = result.splice(sourceIndex, 1);
		result.splice(destinationIndex, 0, reordereditem);
		return result;
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		// const items = Array.from(updatedTasks);
		// const [reorderedItem] = items.splice(result.source.index, 1);
		// items.splice(result.destination.index, 0, reorderedItem);
		setUpdatedTodos((updatedTodos) =>
			reorder(updatedTodos, result.source.index, result.destination.index)
		);
	};

	// console.log(updatedTodos);

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
						<AddTodo />
					</div>

					{/* todo list */}
					<Fade>
						<div className={styles.todoList}>
							<DragDropContext onDragEnd={handleOnDragEnd}>
								<Droppable droppableId='Todos List'>
									{(provided) => (
										<div
											className={styles.todosContainer}
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{updatedTodos?.map(({ todoId, data }, index) => {
												return (
													<Draggable
														key={todoId}
														index={index}
														draggableId={todoId}
														isDragDisabled={isModalOpen}
													>
														{(provided) => (
															<div
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className={styles.todo}
															>
																<Todo data={data} todoId={todoId} sort={sort} />
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
							<TodosInfo sort={sort} setSort={setSort} />
						</div>

						{/* todo sort */}
						<div className={styles.todosSort}>
							<TodosSort sort={sort} setSort={setSort} />
						</div>
					</Fade>
				</div>
			)}
		</div>
	);
}

export default App;
