import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Login.module.css';
import { Fade } from 'react-reveal';
import {
	auth,
	facebookProvider,
	githubProvider,
	googleProvider,
	microsoftProvider,
} from '../firebase';
import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Login = () => {
	// state
	const [isRememberMe, setIsRememberMe] = useState(false);
	const [logininMethod, setLogininMethod] = useState('login');
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	// redux
	const dispatch = useDispatch();

	const darkMode = useSelector(selectTheme);

	// functions
	// react toastify animation
	const toastErrorNotification = (message) => {
		toast.error(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	// login with auth providers: google,facebook,microsoft,github
	const loginWithAuth = (provider) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const { displayName, email, uid, photoURL } = result.user;

				// sending the data to redux
				dispatch(
					login({
						signInProvider: result.providerId,
						user: { name: displayName, email: email, photo: photoURL, id: uid },
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

				if (errorCode === 'auth/account-exists-with-different-credential') {
					toastErrorNotification(
						'Account With The Provided Email Address Already Exists, Please Login To Your Account Or Use A Different Email Address.'
					);
				}
			});
	};

	// login with email and password
	const loginWithEmailAndPassword = (e) => {
		e.preventDefault();

		if (logininMethod === 'login') {
			if (!userEmail || !userPassword) {
				toastErrorNotification('Email And Password Are Required To Login');
				return;
			}
			signInWithEmailAndPassword(auth, userEmail, userPassword)
				.then((result) => {
					// sending the data to redux
					const { displayName, email, uid, photoURL } = result.user;

					dispatch(
						login({
							signInProvider: result.user.providerData[0].providerId,
							user: {
								name: displayName,
								email: email,
								photo: photoURL,
								id: uid,
							},
						})
					);
				})
				.catch((error) => {
					// IF usre does not exist provided email display an error notification
					if (error.code === 'auth/user-not-found') {
						toastErrorNotification('User Does Not Exist');
					}
					// ELSE IF password is wrond display an error notification
					else if (error.code === 'auth/wrong-password') {
						toastErrorNotification('Wrong Credentials');
					}
				});
		} else if (logininMethod === 'register') {
			if (!userName || !userEmail || !userPassword) {
				toastErrorNotification(
					'User Name, Email And Password Are Required To Login'
				);
				return;
			}

			try {
				createUserWithEmailAndPassword(auth, userEmail, userPassword).then(() =>
					updateProfile(auth.currentUser, { displayName: userName })
				);

				const { displayName, email, uid, photoURL } = auth.currentUser;

				dispatch(
					login({
						signInProvider: auth.currentUser.providerData[0].providerId,
						user: {
							name: displayName,
							email: email,
							photo: photoURL,
							id: uid,
						},
					})
				);
			} catch (error) {
				// IF account already exists with the provided email display an error notification
				if (error.code === 'auth/email-already-in-use') {
					toastErrorNotification(
						'Account With The Provided Email Address Already Exists, Please Login To Your Account Or Use A Different Email Address.'
					);
				}

				// ELSE IF email is invalid display an error notification
				else if (error.code === 'auth/invalid-email') {
					toastErrorNotification('Email Address Is Invalid');
				}

				// ELSE IF password is less than 6 characters display an error notification
				else if (error.code === 'auth/weak-password') {
					toastErrorNotification('Password Must Be Greater Than 6 Characters');
				}
			}
		}
	};

	return (
		//  login
		<div className={`${styles.login} ${darkMode && styles['dark-login']}`}>
			{/* react toastify animation */}

			<ToastContainer
				toastStyle={{
					backgroundColor: darkMode ? '#222836' : '#fefefe',
					color: darkMode ? 'white' : 'black',
				}}
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
								<input
									type='text'
									className={styles.name}
									id='name'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</Fade>
						)}
						<label htmlFor='email' className={styles.noselect}>
							Email
						</label>
						<input
							type='email'
							className={styles.password}
							id='email'
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>

						<label htmlFor='password' className={styles.noselect}>
							Password
						</label>
						<input
							type='password'
							className={styles.password}
							id='password'
							value={userPassword}
							onChange={(e) => setUserPassword(e.target.value)}
						/>
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
					<button
						className={styles.submitBtn}
						onClick={loginWithEmailAndPassword}
					>
						{logininMethod === 'login' ? 'Login' : 'Register'}
					</button>
				</form>

				{/* auth login */}
				<div className={styles.auths}>
					{/* google */}
					<div
						className={styles.auth}
						onClick={() => loginWithAuth(googleProvider)}
					>
						<img
							src='assets/images/google-logo.png'
							alt=''
							className={styles.authLogo}
						/>
					</div>

					{/* facebook */}
					<div
						className={styles.auth}
						onClick={() => loginWithAuth(facebookProvider)}
					>
						<img
							src='assets/images/facebook-logo.png'
							alt=''
							className={`${styles.facebookLogo} ${styles.authLogo}`}
						/>
					</div>

					{/* microsoft */}
					<div
						className={styles.auth}
						onClick={() => loginWithAuth(microsoftProvider)}
					>
						<img
							src='assets/images/microsoft-logo.png'
							alt=''
							className={styles.authLogo}
						/>
					</div>

					{/* github */}
					<div
						className={styles.auth}
						onClick={() => loginWithAuth(githubProvider)}
					>
						<img
							src={`assets/images/github-logo-${
								darkMode ? 'light' : 'dark'
							}.png`}
							alt=''
							className={styles.authLogo}
							style={{ height: '60px', width: '60px' }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
