import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import styles from '../styles/Login.module.css';
// icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Fade } from 'react-reveal';

const Login = () => {
	const [isRememberMe, setIsRememberMe] = useState(false);
	const [logininMethod, setLogininMethod] = useState('register');

	const darkMode = useSelector(selectTheme);

	return (
		<div className={`${styles.login} ${darkMode && styles['dark-login']}`}>
			<div className={styles.container}>
				<div className={styles.login__method}>
					<button
						onClick={() => setLogininMethod('login')}
						className={`${styles.loginMethodBtn} ${
							logininMethod === 'login' && styles.loginMethodBtnActive
						}`}
					>
						LOGIN
					</button>
					<button
						onClick={() => setLogininMethod('register')}
						className={`${styles.registerMethodBtn} ${styles.loginMethodBtn} ${
							logininMethod === 'register' && styles.loginMethodBtnActive
						}`}
					>
						Register
					</button>
				</div>

				<form className={styles.info}>
					<div className={styles.inputs}>
						{logininMethod === 'register' && (
							<Fade>
								<label htmlFor='email' className={styles.noselect}>
									Name
								</label>
								<input type='text' className={styles.name} name='name' />
							</Fade>
						)}
						<label htmlFor='email' className={styles.noselect}>
							Email
						</label>
						<input type='email' className={styles.password} name='email' />

						<label htmlFor='password' className={styles.noselect}>
							Password
						</label>
						<input
							type='password'
							className={styles.password}
							name='password'
						/>
					</div>

					{logininMethod === 'login' && (
						<div className={styles.rememberMeForgotPassword}>
							<>
								<div
									className={styles.rememberMe}
									onClick={() => setIsRememberMe((prev) => !prev)}
								>
									{isRememberMe ? (
										<CheckBoxIcon style={{ color: '4c7bf1' }} />
									) : (
										<CheckBoxOutlineBlankIcon />
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
								<p className={`${styles.forgotPasswordBtn} ${styles.noselect}`}>
									Forgot Password?
								</p>
							</>
						</div>
					)}

					<button className={styles.loginBtn}>
						{logininMethod === 'login' ? 'Login' : 'Register'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
