import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
	const navigate = useNavigate()
	const [errorsMessage, setErrorsMessage] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = async (data) => {
		try {
			const response = await axios.post('/auth/login', data)
			console.log(response.data)
			toast.success('Login successful!')
			navigate('/')
		} catch (error) {
			console.error(error.response.data)
			setErrorsMessage(error.response.data)
			toast.error('Error')
		}
	}

	const inputClasses = () => {
		return 'appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500'
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-4 rounded-2xl drop-shadow-2xl">
				<div>
					<h2 className="mt-4 text-center text-4xl font-extrabold text-gray-900">Login</h2>
				</div>
				<form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						name="username"
						type="text"
						autoComplete="username"
						{...register('username', { required: true })}
						className={inputClasses`${errors.username ? 'border-red-500' : ''}`}
						placeholder="Username"
					/>
					{errors.username && <span className="text-red-500 text-sm">Username is required</span>}
					<input
						name="password"
						type="password"
						autoComplete="current-password"
						{...register('password', { required: true })}
						className={inputClasses`${errors.password ? 'border-red-500' : ''}`}
						placeholder="Password"
					/>
					{errors.password && <span className="text-red-500 text-sm">Password is required</span>}

					<div>
						{errorsMessage && <span className="text-red-500 text-sm">{errorsMessage}</span>}
						<button
							type="submit"
							className="w-full py-2 px-4 text-sm mt-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Login
						</button>
					</div>
					<p className="text-right">
						Don’t have an account?{' '}
						<Link to={'/register'} className="text-blue-600 font-bold">
							Register here
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login
