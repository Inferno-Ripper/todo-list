import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Login.module.css';
import { Fade } from 'react-reveal';
import {
	auth,
	facebookProvider,
	googleProvider,
	microsoftProvider,
	provider,
} from '../firebase';
import {
	GoogleAuthProvider,
	OAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
// icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AppleIcon from '@mui/icons-material/Apple';
import { login } from '../features/userSlice';

const Login = () => {
	// state
	const [isRememberMe, setIsRememberMe] = useState(false);
	const [logininMethod, setLogininMethod] = useState('login');

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	// functions
	const loginWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				// sending the data to redux
				dispatch(
					login({
						signInProvider: result.providerId,
						user: { name: user.displayName, email: user.email },
					})
				);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	const loginWithFacebook = () => {
		signInWithPopup(auth, facebookProvider)
			.then((result) => {
				// The signed-in user info.
				const user = result._tokenResponse;

				// sending the data to redux
				dispatch(
					login({
						signInProvider: result.providerId,
						user: {
							name: user.displayName,
							email: user.email,
						},
					})
				);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				console.log(error);
			});
	};

	const loginWithMicrosoft = () => {
		signInWithPopup(auth, microsoftProvider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				// sending the data to redux
				dispatch(
					login({
						signInProvider: result.providerId,
						user: { name: user.displayName, email: user.email },
					})
				);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});

		microsoftProvider.setCustomParameters({
			tenant: '52237e8e-58c1-4715-9c0b-341df4360da0',
		});
	};

	return (
		// login
		<div className={`${styles.login} ${darkMode && styles['dark-login']}`}>
			{/* container */}
			<div className={styles.container}>
				{/* login method */}
				<div className={styles.login__method}>
					{/* login method button */}
					<button
						onClick={() => setLogininMethod('login')}
						className={`${styles.loginMethodBtn} ${
							logininMethod === 'login' && styles.loginMethodBtnActive
						}`}
					>
						LOGIN
					</button>

					{/* register method button */}
					<button
						onClick={() => setLogininMethod('register')}
						className={`${styles.registerMethodBtn} ${styles.loginMethodBtn} ${
							logininMethod === 'register' && styles.loginMethodBtnActive
						}`}
					>
						Register
					</button>
				</div>

				{/* user info */}
				<form className={styles.userInfo}>
					{/* inputs */}
					<div className={styles.inputs}>
						{/* IF register method is selected THEN render the name input */}
						{logininMethod === 'register' && (
							<Fade>
								<label htmlFor='name' className={styles.noselect}>
									Name
								</label>
								<input type='text' className={styles.name} id='name' />
							</Fade>
						)}
						<label htmlFor='email' className={styles.noselect}>
							Email
						</label>
						<input type='email' className={styles.password} id='email' />

						<label htmlFor='password' className={styles.noselect}>
							Password
						</label>
						<input type='password' className={styles.password} id='password' />
					</div>

					{logininMethod === 'login' && (
						// remember me and forgot password
						<div className={styles.rememberMeForgotPassword}>
							<>
								{/* remember me  */}
								<div
									className={styles.rememberMe}
									onClick={() => setIsRememberMe((prev) => !prev)}
								>
									{isRememberMe ? (
										<CheckBoxIcon style={{ color: '4c7bf1' }} />
									) : (
										<CheckBoxOutlineBlankIcon style={{ color: '909091' }} />
									)}
									<p
										className={`${styles.rememberMe} ${styles.noselect} ${
											isRememberMe
												? styles.rememberMeTextActive
												: styles.rememberMeText
										}`}
									>
										Remember Me
									</p>
								</div>

								{/* forgot password  */}
								<p className={`${styles.forgotPasswordBtn} ${styles.noselect}`}>
									Forgot Password?
								</p>
							</>
						</div>
					)}

					{/* submit button */}
					<button className={styles.submitBtn}>
						{logininMethod === 'login' ? 'Login' : 'Register'}
					</button>
				</form>

				{/* auth login */}
				<div className={styles.auths}>
					{/* google */}
					<div className={styles.auth} onClick={loginWithGoogle}>
						<img
							src='assets/images/google-logo.png'
							alt=''
							className={styles.authLogo}
						/>
					</div>

					{/* facebook */}
					<div className={styles.auth} onClick={loginWithFacebook}>
						<img
							src='assets/images/facebook-logo.png'
							alt=''
							className={`${styles.facebookLogo} ${styles.authLogo}`}
						/>
					</div>

					{/* microsoft */}
					<div className={styles.auth} onClick={loginWithMicrosoft}>
						<img
							src='assets/images/microsoft-logo.png'
							alt=''
							className={styles.authLogo}
						/>
					</div>

					{/* apple */}
					<div className={styles.auth}>
						<AppleIcon className={`${styles.appleLogo} ${styles.authLogo}`} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
