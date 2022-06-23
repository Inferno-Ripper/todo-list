import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeTheTheme, selectTheme } from '../features/darkModeSlice';
import { selectIsUserLoggedIn } from '../features/userSlice';
import styles from '../styles/Header.module.css';
import UserInfo from './UserInfo';
// icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = () => {
	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	// functions
	const changeTheme = () => {
		// IF darkmode is True set it to False ELSE set it to True
		dispatch(changeTheTheme(darkMode === true ? false : true));
	};

	return (
		<>
			{/* todo list text */}
			<h1 className={styles.todoListText}>Todo List</h1>

			{/* top right */}
			<div className={styles.topRight}>
				<div className={styles.themeIcon} onClick={changeTheme}>
					{/* IF darkMode is True display the  LightModeIcon ELSE display the DarkModeIcon*/}
					{darkMode ? (
						<LightModeIcon style={{ color: 'white' }} />
					) : (
						<DarkModeIcon style={{ color: 'black' }} />
					)}
				</div>

				{isUserLoggedIn && (
					<div className={styles.userInfo}>
						<UserInfo />
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
