import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Zoom } from 'react-reveal';
import { selectTheme } from '../features/darkModeSlice';
import { selectSignInProvider, selectUser } from '../features/userSlice';
import styles from '../styles/ChangePasswordModal.module.css';
import { getAuth, updatePassword } from 'firebase/auth';

const ChangePasswordModal = ({
	setIsChangePasswordModalOpen,
	passwordChangedNotification,
	passwordNotChangedNotification,
}) => {
	// state
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	// redux selectors
	const darkMode = useSelector(selectTheme);
	const user = useSelector(selectUser);
	const signInProvider = useSelector(selectSignInProvider);

	// functions
	const changePassword = (e) => {
		e.preventDefault();
		const auth = getAuth();

		if (newPassword.length >= 6) {
			updatePassword(auth.currentUser, newPassword)
				.then(() => {
					passwordChangedNotification();

					setIsChangePasswordModalOpen(false);
				})
				.catch((error) => {
					passwordNotChangedNotification(
						'Changing Password Requires Recent Login. Please Logout And Log Back Again To Change Your Password'
					);

					setIsChangePasswordModalOpen(false);
				});
		} else {
			passwordNotChangedNotification(
				'Password Must be Greater Than 6 Characters'
			);

			setIsChangePasswordModalOpen(false);
		}
	};
	const closeModal = () => {
		setIsChangePasswordModalOpen(false);
	};

	let signInProviderName = signInProvider;
	const signInProviderNamefunc = () => {
		// combine the two strings
		signInProviderName =
			// find the first letter from signInProvider string and make it uppercase
			signInProvider.charAt(0).toUpperCase() +
			// find the charactors from the second letter and stop before the dot/period/full stop
			signInProvider.slice(1, signInProvider.lastIndexOf('.'));
	};
	signInProviderNamefunc();

	return (
		<>
			{/* modal */}
			<div className={`${styles.modal} ${darkMode && styles['dark-modal']}`}>
				{/* react toastify animation */}

				<Zoom>
					{/* container */}
					<form className={styles.container}>
						{signInProvider === 'password' ? (
							<>
								<div>
									{/* password */}

									<div className={styles.password}>
										{/* form label */}
										<label htmlFor='new password'>New Password</label>
										<input
											type='password'
											id='new password'
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
										/>
									</div>
								</div>

								{/* submit button */}
								<button
									className={`${styles.btn} ${styles.submitBtn}`}
									onClick={changePassword}
								>
									Submit
								</button>
							</>
						) : (
							// change text password
							<div className={styles.changePasswordModal}>
								<div>
									<div className={styles.loginMethod}>
										<span> Login Method:</span> <p>{signInProviderName}</p>
									</div>
									<p className={styles.loginMethodText}>
										Password can only be changed if the login method is Email
										and Password
									</p>
								</div>

								{/* submit button */}
								<button
									className={`${styles.btn} ${styles.closeModalBtn}`}
									onClick={changePassword}
								>
									Close
								</button>
							</div>
						)}

						{/* close button */}
						<h1 className={styles.closeBtn} onClick={closeModal}>
							X
						</h1>
					</form>
				</Zoom>
			</div>
		</>
	);
};

export default ChangePasswordModal;
