import React from 'react';
import { useSelector } from 'react-redux';
import { Zoom } from 'react-reveal';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/ChangePasswordModal.module.css';

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
			// onClick={closeModal}
			className={`${styles.modal} ${darkMode && styles['dark-modal']}`}
		>
			<Zoom>
				<form className={styles.container}>
					<div>
						<div className={styles.password}>
							<label htmlFor='oldPassword'>Old Password</label>
							<input type='password' name='oldPassword' />
						</div>
						<div className={styles.password}>
							<label htmlFor='NewPassword'>New Password</label>
							<input type='password' />
						</div>
					</div>

					<button className={styles.submitBtn} onClick={changePassword}>
						Submit
					</button>

					<h1 className={styles.closeBtn} onClick={closeModal}>
						X
					</h1>
				</form>
			</Zoom>
		</div>
	);
};

export default ChangePasswordModal;
