import React from 'react';
import '../styles/UserInfo.css';
import { Fade } from 'react-reveal';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
// icons
import PersonIcon from '@mui/icons-material/Person';

const UserInfo = () => {
	const darkMode = useSelector(selectTheme);

	return (
		<div
			className={`${darkMode ? 'dark-userInfo' : 'light-userInfo'} userInfo`}
		>
			<PersonIcon />
			<div
				className={`${
					darkMode ? 'dark-userInfo__list' : 'light-userInfo__list'
				} userInfo__list`}
			>
				<p>Name</p>
				<p>Email</p>
				<p>Change Password</p>
				<p>Logout</p>
			</div>
			<div className='userInfo__upArrow'></div>
		</div>
	);
};

export default UserInfo;
