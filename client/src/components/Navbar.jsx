import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { FilmIcon, HomeModernIcon, VideoCameraIcon, TicketIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const [username, setUsername] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const navigate = useNavigate()

	const onLogout = async () => {
		try {
			const response = await axios.get('/auth/logout')
			console.log(response)
			setAuth({ username: null, email: null, role: null, token: null })
			setUsername('')
			navigate('/')
			toast.success('Logout successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		}
	}

	const menuLists = () => {
		return (
			<>
				<div className="flex flex-col gap-2 md:flex-row">
					<Link
						to={'/cinema'}
						className={`flex items-center justify-center gap-2 rounded-md py-1 px-2 text-white hover:bg-gray-500 ${
							window.location.pathname === '/cinema'
								? 'bg-gradient-to-br from-indigo-800 to-blue-700'
								: 'bg-gray-600'
						}`}
					>
						<HomeModernIcon className="h-6 w-6" />
						<p>Cinema</p>
					</Link>
					<Link
						to={'/movie'}
						className={`flex items-center justify-center gap-2 rounded-md py-1 px-2 text-white hover:bg-gray-500 ${
							window.location.pathname === '/movie'
								? 'bg-gradient-to-br from-indigo-800 to-blue-700'
								: 'bg-gray-600'
						}`}
					>
						<VideoCameraIcon className="h-6 w-6" />
						<p>Movie</p>
					</Link>
					<Link
						to={'/tickets'}
						className={`flex items-center justify-center gap-2 rounded-md py-1 px-2 text-white hover:bg-gray-500 ${
							window.location.pathname === '/tickets'
								? 'bg-gradient-to-br from-indigo-800 to-blue-700'
								: 'bg-gray-600'
						}`}
					>
						<TicketIcon className="h-6 w-6" />
						<p>Tickets</p>
					</Link>
				</div>
				<div className="flex grow items-center justify-center gap-3 md:justify-end">
					{auth.username && (
						<p className="text-md whitespace-nowrap leading-none text-white">Welcome {auth.username}!</p>
					)}
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
			</>
		)
	}

	return (
		<nav className="flex flex-col items-center justify-between gap-2 bg-gray-900 py-3 px-5 drop-shadow-lg md:flex-row md:justify-start">
			<div className="flex w-full flex-row justify-between md:w-fit">
				<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
					<FilmIcon className="h-8 w-8 text-white" />
					<h1 className="mr-2 text-xl text-white">Cinema</h1>
				</button>
				<button
					className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700 md:hidden"
					onClick={() => toggleMenu()}
				>
					<Bars3Icon className="h-6 w-6 text-white" />
				</button>
			</div>
			<div className="hidden grow justify-between gap-2 md:flex">{menuLists()}</div>
			{menuOpen && <div className="flex w-full grow flex-col gap-2 md:hidden">{menuLists()}</div>}
		</nav>
	)
}

export default Navbar
