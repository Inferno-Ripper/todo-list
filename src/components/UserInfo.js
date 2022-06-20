import React, { useState } from 'react';
import '../styles/UserInfo.css';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
// icons
import PersonIcon from '@mui/icons-material/Person';
import ChangePasswordModal from './ChangePasswordModal';
import { closeModalRedux } from '../features/modalSlice';
import { useDispatch } from 'react-redux';

const UserInfo = () => {
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
		useState(true);

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
					className={`${
						darkMode ? 'dark-userInfo' : 'light-userInfo'
					} userInfo`}
				>
					<PersonIcon />
					<div
						className={`${
							darkMode ? 'dark-userInfo__list' : 'light-userInfo__list'
						} userInfo__list`}
					>
						<p>Name</p>
						<p>Email</p>
						<p onClick={openChangePasswordModal}>Change Password</p>
						<p>Logout</p>
					</div>
					<div className='userInfo__upArrow'></div>
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
