import React from 'react';
import { useSelector } from 'react-redux';
import { Zoom } from 'react-reveal';
import { selectTheme } from '../features/darkModeSlice';
import { selectSignInProvider, selectUser } from '../features/userSlice';
import styles from '../styles/ChangePasswordModal.module.css';

const ChangePasswordModal = ({ setIsChangePasswordModalOpen }) => {
	// redux selectors
	const darkMode = useSelector(selectTheme);
	const user = useSelector(selectUser);
	const signInProvider = useSelector(selectSignInProvider);

	// functions
	const changePassword = (e) => {
		e.preventDefault();

		setIsChangePasswordModalOpen(false);
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
		// modal
		<div className={`${styles.modal} ${darkMode && styles['dark-modal']}`}>
			<Zoom>
				{/* container */}
				<form className={styles.container}>
					{signInProvider === 'emailAndPassword' ? (
						<>
							<div>
								{/* password */}
								<div className={styles.password}>
									{/* form label */}
									<label htmlFor='old password'>Old Password</label>
									<input type='password' id='old password' />
								</div>
								<div className={styles.password}>
									{/* form label */}
									<label htmlFor='new password'>New Password</label>
									<input type='password' id='new password' />
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
									Password can only be changed if the login method is Email and
									Password
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
	);
};

export default ChangePasswordModal;
