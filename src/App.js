import react, { useState } from 'react';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheTheme, selectTheme } from './features/darkModeSlice';
import { Fade } from 'react-reveal';

// icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';
import PersonIcon from '@mui/icons-material/Person';

function App() {
	const [todos, setTodos] = useState([]);

	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	const changeTheme = () => {
		// IF darkmode is True set it to False ELSE set it to True
		dispatch(changeTheTheme(darkMode === true ? false : true));
	};

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

				<div className='App__userInfo'>
					<PersonIcon />
				</div>
			</div>

			<h1 className='App__todoListText'>Todo List</h1>

			{/* todos */}
			<div className='App__content'>
				{/* add a new todo */}
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
						<div className='App__todos'>
							{todos.map(({ bodyText }) => {
								return (
									<div
										className={`${
											darkMode ? 'dark-App__todo' : 'light-App__todo'
										} App__todo`}
									>
										<Todo text={bodyText} />
									</div>
								);
							})}
						</div>

						{/* todo info */}
						<TodosInfo />
					</div>

					{/* todo sort */}
					<div className='App__todosInfo'>
						<TodosSort />
					</div>
				</Fade>
			</div>
		</div>
	);
}

export default App;
