import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { FilmIcon, HomeModernIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const [username, setUsername] = useState('')

	const navigate = useNavigate()

	const onLogout = async () => {
		try {
			const response = await axios.get('/auth/logout')
			console.log(response)
			setAuth({ username: null, email: null, role: null, token: null })
			setUsername('')
			navigate('/')
			toast.success('Logout successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	return (
		<nav className="flex flex-wrap items-center justify-between gap-2 bg-gray-900 py-3 px-5 drop-shadow-lg">
			<div className="flex flex-wrap gap-2">
				<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
					<FilmIcon className="h-8 w-8 text-white" />
					<h1 className="mr-2 text-xl text-white">Cinema</h1>
				</button>
				<button className="flex gap-2 rounded-md bg-gray-600 py-1 px-2 text-white hover:bg-gray-500">
					<HomeModernIcon className="h-6 w-6" />
					<Link to={'/cinema-mgt'}>Cinema management</Link>
				</button>
				<button className="flex gap-2 rounded-md bg-gray-600 py-1 px-2 text-white hover:bg-gray-500">
					<VideoCameraIcon className="h-6 w-6" />
					<Link to={'/movie-mgt'}>Movie management</Link>
				</button>
			</div>
			<div className="flex flex-wrap items-center gap-3">
				{auth.username && <p className="text-md leading-none text-white">Welcome {auth.username}!</p>}
				{auth.token ? (
					<button
						className="rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-2 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400"
						onClick={() => onLogout()}
					>
						<p>Logout</p>
					</button>
				) : (
					<button className="rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-2 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400">
						<Link to={'/login'}>Login</Link>
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
