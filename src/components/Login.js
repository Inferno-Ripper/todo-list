import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Login.module.css';
import { Fade } from 'react-reveal';
// icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AppleIcon from '@mui/icons-material/Apple';

const Login = () => {
	// state
	const [isRememberMe, setIsRememberMe] = useState(false);
	const [logininMethod, setLogininMethod] = useState('register');

	// redux
	const darkMode = useSelector(selectTheme);

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
					<div className={styles.auth}>
						<img
							src='assets/images/google-logo.png'
							alt=''
							className={styles.authLogo}
						/>
					</div>
					{/* facebook */}
					<div className={styles.auth}>
						<img
							src='assets/images/facebook-logo.png'
							alt=''
							className={`${styles.facebookLogo} ${styles.authLogo}`}
						/>
					</div>
					{/* microsoft */}
					<div className={styles.auth}>
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
