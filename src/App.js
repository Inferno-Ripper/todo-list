import { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/darkModeSlice';
import { Bounce, Fade, Flip, Slide, Zoom } from 'react-reveal';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';
import { login, selectIsUserLoggedIn, selectUser } from './features/userSlice';
import Login from './components/Login';
import Header from './components/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { selectAllTodos, selectTodosList } from './features/todosSlice';
import { selectIsModalOpen } from './features/modalSlice';
import Modal from './components/Modal';

function App() {
	// state
	const [sort, setSort] = useState('getAll');

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
	const todosList = useSelector(selectTodosList);
	const allTodos = useSelector(selectAllTodos);
	const isModalOpen = useSelector(selectIsModalOpen);

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
					<Fade bottom when={allTodos.length > 0}>
						<div className={styles.todoList}>
							<div className={styles.todosContainer}>
								{todosList?.map(({ todoId, data }) => (
									<div key={todoId} className={styles.todo}>
										<Todo data={data} todoId={todoId} sort={sort} />
									</div>
								))}
							</div>

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

			{isModalOpen && <Modal />}
		</div>
	);
}

export default App;
