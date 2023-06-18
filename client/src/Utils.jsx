import { TrashIcon } from '@heroicons/react/24/solid'
import Navbar from './components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const Utils = () => {
	const { auth } = useContext(AuthContext)

	const handleDeleteShowtimes = () => {
		const confirmed = window.confirm(`Do you want to delete all showtimes in previous day, including its tickets?`)
		if (confirmed) {
			onDeleteShowtimes()
		}
	}

	const onDeleteShowtimes = async (id) => {
		try {
			const response = await axios.delete(`/showtime/previous`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			toast.success(`Delete ${response.data.count} showtimes successful!`, {
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

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 h-fit rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold">Delete all showtimes in previous day</p>
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-700 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600"
						onClick={() => handleDeleteShowtimes()}
					>
						DELETE
						<TrashIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Utils
