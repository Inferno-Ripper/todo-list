import React, { useState } from 'react';
import styles from '../styles/UserInfo.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import ChangePasswordModal from './ChangePasswordModal';
import { closeModalRedux } from '../features/modalSlice';
import { useDispatch } from 'react-redux';
import {
	logoutRedux,
	selectUser,
	selectSignInProvider,
} from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

// icons
import PersonIcon from '@mui/icons-material/Person';

const UserInfo = () => {
	// state
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
		useState(false);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);
	const user = useSelector(selectUser);
	const signInProvider = useSelector(selectSignInProvider);

	// functions
	const openChangePasswordModal = () => {
		dispatch(closeModalRedux());

		setIsChangePasswordModalOpen(true);
	};

	let userEmail;
	const microsoftEmailReformat = () => {
		if (signInProvider === 'microsoft.com') {
			userEmail = user.email
				.replace('_', '@')
				.slice(0, user.email.indexOf('#'));
		} else {
			userEmail = user?.email;
		}
	};
	microsoftEmailReformat();

	const logout = () => {
		// first sign out of redux
		dispatch(logoutRedux());

		// then sign out of firebase
		signOut(auth);
	};

	// react toastify animation
	const passwordChangedNotification = () => {
		toast.success('Password Changed', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const passwordNotChangedNotification = (errorMessage) => {
		toast.error(errorMessage, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<>
			<ToastContainer
				toastStyle={{
					backgroundColor: darkMode ? '#222836' : '#fefefe',
					color: darkMode ? 'white' : 'black',
					fontSize: '20px',
				}}
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div>
				{/* user info */}
				<div
					className={`${styles.userInfo} ${
						darkMode && styles['dark-userInfo']
					} `}
				>
					{/* account icon */}

					{/* <PersonIcon src={user?.photo} className={styles.accountIcon} /> */}

					{user.photo ? (
						<img src={user.photo} alt='' className={styles.accountIconPhoto} />
					) : (
						<PersonIcon className={styles.accountIcon} />
					)}

					{/* container */}
					<div className={styles.container}>
						<p>{user?.name}</p>
						<p>{userEmail}</p>
						<p onClick={openChangePasswordModal}>Change Password</p>
						<p onClick={logout}>Logout</p>
					</div>

					{/* up arrow */}
					<div className={styles.upArrow}></div>
				</div>

				{isChangePasswordModalOpen && (
					<ChangePasswordModal
						setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
						passwordChangedNotification={passwordChangedNotification}
						passwordNotChangedNotification={passwordNotChangedNotification}
					/>
				)}
			</div>
		</>
	);
};

export default UserInfo;
