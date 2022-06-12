import { useState } from 'react';
import './styles/App.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeTheTheme, selectTheme } from './features/darkModeSlice';

// icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import TodosInfo from './components/TodosInfo';
import TodosSort from './components/TodosSort';

function App() {
	const [themeIcon, setThemeIcon] = useState(LightModeIcon);

	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	const changeTheme = () => {
		// IF darkmode is True set it to False ELSE set it to True
		dispatch(changeTheTheme(darkMode === true ? false : true));
	};

	const mediaMatch = window.matchMedia('(min-width: 500px)');

	return (
		// IF the theme is set to dark then give the div dark-App className ELSE give the div light-App className
		<div className={`${darkMode ? 'dark-App' : 'light-App'} App`}>
			<div className='App__themeIcon' onClick={changeTheme}>
				{/* IF darkMode is True display the  LightModeIcon ELSE display the DarkModeIcon*/}
				{darkMode ? (
					<LightModeIcon style={{ color: 'white' }} />
				) : (
					<DarkModeIcon style={{ color: 'black' }} />
				)}
			</div>

			<h1 className='App__todoListText'>Todo List</h1>

			{/* todos */}
			<div className='App__content'>
				{/* add a new todo */}
				<div>
					<AddTodo />
				</div>

				{/* todo list */}
				<div
					className={`${
						darkMode ? 'dark-App__todoList' : 'light-App__todoList'
					} App__todoList`}
				>
					<div className='App__todos'>
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
						<Todo />
					</div>

					{/* todo info */}
					<TodosInfo />
				</div>

				{/* todo sort */}
				<div className='App__todosInfo'>
					<TodosSort />
				</div>
			</div>
		</div>
	);
}

export default App;
