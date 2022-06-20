import React from 'react';
import { useSelector } from 'react-redux';
import { Zoom } from 'react-reveal';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/ChangePasswordModal.css';

const ChangePasswordModal = ({ setIsChangePasswordModalOpen }) => {
	const darkMode = useSelector(selectTheme);

	const changePassword = (e) => {
		e.preventDefault();

		setIsChangePasswordModalOpen(false);
	};
	const closeModal = () => {
		setIsChangePasswordModalOpen(false);
	};

	return (
		<div
			onClick={closeModal}
			className={`${
				darkMode ? 'dark-changePasswordModal' : 'light-changePasswordModal'
			} changePasswordModal`}
		>
			<Zoom>
				<form className='changePasswordModalContainer'>
					<div>
						<div className='password'>
							<label htmlFor='oldPassword'>Old Password</label>
							<input type='password' name='oldPassword' />
						</div>
						<div className='password'>
							<label htmlFor='NewPassword'>New Password</label>
							<input type='password' />
						</div>
					</div>

					<button className='passwordBtn' onClick={changePassword}>
						Submit
					</button>

					<h1 className='changePasswordModalCloseBtn' onClick={closeModal}>
						X
					</h1>
				</form>
			</Zoom>
		</div>
	);
};

export default ChangePasswordModal;
