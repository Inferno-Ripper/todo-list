import { useState } from 'react';
import './styles/App.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeTheTheme, selectTheme } from './features/darkModeSlice';

// icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AddTodo from './components/AddTodo';

function App() {
	const [themeIcon, setThemeIcon] = useState(LightModeIcon);

	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	const changeTheme = () => {
		// IF darkmode is True set it to False ELSE set it to True
		dispatch(changeTheTheme(darkMode === true ? false : true));
	};

	return (
		// IF the theme is set to dark then give the div dark-App className ELSE give the div light-App className
		<div className={`${darkMode ? 'dark-App' : 'light-App'} App`}>
			<div className='App__themeIcon' onClick={changeTheme}>
				{/* IF darkMode is True display the  LightModeIcon ELSE display the DarkModeIcon*/}
				{darkMode ? (
					<LightModeIcon style={{ color: 'white', fontSize: '40px' }} />
				) : (
					<DarkModeIcon style={{ color: 'black', fontSize: '40px' }} />
				)}
			</div>

			<h1 className='App__todoListText'>Todo List</h1>

			<div className='App__todos'>
				<AddTodo />
			</div>
		</div>
	);
}

export default App;
