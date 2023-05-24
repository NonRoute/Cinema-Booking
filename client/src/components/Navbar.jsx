import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { FilmIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

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
		<nav className="flex bg-gray-900 py-3 px-5 justify-between items-center drop-shadow-lg">
			<div className="flex gap-2">
				<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
					<FilmIcon className="w-8 h-8 text-white" />
					<h1 className="text-white text-xl mr-2">Cinema</h1>
				</button>

				<button className="bg-gray-600 hover:bg-gray-500 rounded-md py-1 px-2 text-white flex gap-2">
					<AdjustmentsHorizontalIcon className="w-6 h-6" />
					<Link to={'/cinema-mgt'}>Cinema management</Link>
				</button>
			</div>
			<div className="flex items-center gap-3">
				{auth.username && <p className="text-white leading-none text-md">Welcome {auth.username}!</p>}
				{auth.token ? (
					<button
						className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 rounded-lg py-1 px-2 text-white drop-shadow-md"
						onClick={() => onLogout()}
					>
						<p>Logout</p>
					</button>
				) : (
					<button className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 rounded-lg py-1 px-2 text-white drop-shadow-md">
						<Link to={'/login'}>Login</Link>
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
