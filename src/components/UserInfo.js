import React, { useState } from 'react';
import styles from '../styles/UserInfo.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import ChangePasswordModal from './ChangePasswordModal';
import { closeModalRedux } from '../features/modalSlice';
import { useDispatch } from 'react-redux';
// icons
import PersonIcon from '@mui/icons-material/Person';

const UserInfo = () => {
	// state
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
		useState(false);

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	// functions
	const openChangePasswordModal = () => {
		dispatch(closeModalRedux());

		setIsChangePasswordModalOpen(true);
	};

	return (
		<>
			<div>
				{/* user info */}
				<div
					className={`${styles.userInfo} ${
						darkMode && styles['dark-userInfo']
					} `}
				>
					{/* account icon */}
					<PersonIcon className={styles.accountIcon} />

					{/* container */}
					<div className={styles.container}>
						<p>Name</p>
						<p>Email</p>
						<p onClick={openChangePasswordModal}>Change Password</p>
						<p>Logout</p>
					</div>

					{/* up arrow */}
					<div className={styles.upArrow}></div>
				</div>

				{isChangePasswordModalOpen && (
					<ChangePasswordModal
						setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
					/>
				)}
			</div>
		</>
	);
};

export default UserInfo;
