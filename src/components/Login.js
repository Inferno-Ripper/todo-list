import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/darkModeSlice';
import '../styles/Login.css';
// icons
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button } from '@mui/material';

const Login = () => {
	const [isRememberMe, setIsRememberMe] = useState(false);

	const darkMode = useSelector(selectTheme);

	return (
		<div className={`${darkMode ? 'dark-login' : 'light-login'} login`}>
			<div className='login__container'>
				<div className='login__method'>
					<button className='login__loginMethodBtn login__methodBtn login__btnActive'>
						LOGIN
					</button>
					<button className='login__signupMethodBtn login__methodBtn'>
						SIGN UP
					</button>
				</div>

				<form className='login__info'>
					<div className='login__inputs'>
						<label htmlFor='email' className='noselect'>
							Email
						</label>
						<input type='email' className='login__email' name='email' />
						<label htmlFor='password' className='noselect'>
							Password
						</label>
						<input
							type='password'
							className='login__password '
							name='password'
						/>
					</div>

					<div className='login__rememberMeForgotPassword'>
						<div
							className='login__rememberMe'
							onClick={() => setIsRememberMe((prev) => !prev)}
						>
							{isRememberMe ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
							<p
								className={`${
									isRememberMe
										? 'login__rememberMeTextActive'
										: 'login__rememberMeText'
								} login__rememberMe noselect`}
							>
								Remember Me
							</p>
						</div>
						<p className='login__forgotPasswordBtn noselect'>
							Forgot Password?
						</p>
					</div>
					<button className='login__loginBtn'>Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
