import React, { useState } from 'react';
import styles from '../styles/UserInfo.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
// icons
import PersonIcon from '@mui/icons-material/Person';
import ChangePasswordModal from './ChangePasswordModal';
import { closeModalRedux } from '../features/modalSlice';
import { useDispatch } from 'react-redux';

const UserInfo = () => {
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
		useState(false);

	const darkMode = useSelector(selectTheme);

	const dispatch = useDispatch();

	const openChangePasswordModal = () => {
		dispatch(closeModalRedux());

		setIsChangePasswordModalOpen(true);
	};

	return (
		<>
			<div>
				<div
					className={`${styles.userInfo} ${
						darkMode && styles['dark-userInfo']
					} `}
				>
					<PersonIcon className={styles.accountIcon} />
					<div className={styles.container}>
						<p>Name</p>
						<p>Email</p>
						<p onClick={openChangePasswordModal}>Change Password</p>
						<p>Logout</p>
					</div>
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
