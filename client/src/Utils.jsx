import { TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import Select from 'react-tailwindcss-select'

const Utils = () => {
	const { auth } = useContext(AuthContext)
	const [isDeletingShowtimes, setIsDeletingShowtimes] = useState(false)
	const [isDeletingShowtimesPrev, setIsDeletingShowtimesPrev] = useState(false)

	const [showtimes, setShowtimes] = useState([])
	const [filterCinema, setFilterCinema] = useState(null)
	const [filterTheater, setFilterTheater] = useState(null)
	const [filterMovie, setFilterMovie] = useState(null)
	const [filterShowtime, setFilterShowtime] = useState(null)

	const filteredShowtimes = showtimes.filter((showtime) => {
		const showtimeDate = new Date(showtime.showtime)
		const year = showtimeDate.getFullYear()
		const month = showtimeDate.toLocaleString('default', { month: 'short' })
		const day = showtimeDate.getDate().toString().padStart(2, '0')
		const formattedShowtime = `${day} ${month} ${year}`
		return (
			(!filterCinema || filterCinema.map((cinema) => cinema.value).includes(showtime.theater.cinema._id)) &&
			(!filterTheater || filterTheater.map((theater) => theater.value).includes(showtime.theater.number)) &&
			(!filterMovie || filterMovie.map((movie) => movie.value).includes(showtime.movie._id)) &&
			(!filterShowtime || filterShowtime.map((showtime) => showtime.value).includes(formattedShowtime))
		)
	})

	console.log('filteredShowtimes', filteredShowtimes)

	const fetchShowtimes = async (data) => {
		try {
			// setIsFetchingMoviesDone(false)
			const response = await axios.get('/showtime')
			console.log(response.data.data)
			setShowtimes(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			// setIsFetchingMoviesDone(true)
		}
	}

	useEffect(() => {
		fetchShowtimes()
	}, [])

	const handleDeleteShowtimes = () => {
		const confirmed = window.confirm(`Do you want to delete all showtimes, including its tickets?`)
		if (confirmed) {
			onDeleteShowtimes()
		}
	}

	const onDeleteShowtimes = async (id) => {
		setIsDeletingShowtimes(true)
		try {
			const response = await axios.delete(`/showtime`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
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
		} finally {
			setIsDeletingShowtimes(false)
		}
	}

	const handleDeleteShowtimesPrev = () => {
		const confirmed = window.confirm(`Do you want to delete all showtimes in previous day, including its tickets?`)
		if (confirmed) {
			onDeleteShowtimesPrev()
		}
	}

	const onDeleteShowtimesPrev = async (id) => {
		setIsDeletingShowtimesPrev(true)
		try {
			const response = await axios.delete(`/showtime/previous`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
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
		} finally {
			setIsDeletingShowtimesPrev(false)
		}
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 flex h-fit flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Search Showtimes</h2>
				<div className={`my-4 grid grid-cols-5 rounded-md bg-gradient-to-br from-indigo-100 to-white`}>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white">
						Cinema
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white">
						Theater
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white">
						Movie
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white">
						Showtime
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white">
						Action
					</p>
					<Select
						value={filterCinema}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.theater.cinema._id))).map(
							(value) => ({
								value,
								label: showtimes.find((showtime) => showtime.theater.cinema._id === value).theater
									.cinema.name
							})
						)}
						onChange={(value) => setFilterCinema(value)}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<Select
						value={filterTheater}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.theater.number))).map(
							(value) => ({
								value,
								label: value.toString()
							})
						)}
						onChange={(value) => setFilterTheater(value)}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<Select
						value={filterMovie}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.movie._id))).map((value) => ({
							value,
							label: showtimes.find((showtime) => showtime.movie._id === value).movie.name
						}))}
						onChange={(value) => setFilterMovie(value)}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<Select
						value={filterShowtime}
						options={Array.from(
							new Set(
								showtimes.map((showtime) => {
									const showtimeDate = new Date(showtime.showtime)
									const year = showtimeDate.getFullYear()
									const month = showtimeDate.toLocaleString('default', { month: 'short' })
									const day = showtimeDate.getDate().toString().padStart(2, '0')
									return `${day} ${month} ${year}`
								})
							)
						).map((value) => ({
							value,
							label: value
						}))}
						onChange={(value) => setFilterShowtime(value)}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<p className="sticky top-0 bg-gradient-to-br from-indigo-100 to-white text-center text-lg font-semibold ">
						Action
					</p>
				</div>
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold">Delete all showtimes</p>
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-700 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600 disabled:from-slate-500 disabled:to-slate-400"
						onClick={() => handleDeleteShowtimes()}
						disabled={isDeletingShowtimes}
					>
						{isDeletingShowtimes ? (
							'Processing...'
						) : (
							<>
								DELETE
								<TrashIcon className="h-5 w-5" />
							</>
						)}
					</button>
				</div>
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold">Delete all showtimes in previous day</p>
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-700 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600 disabled:from-slate-500 disabled:to-slate-400"
						onClick={() => handleDeleteShowtimesPrev()}
						disabled={isDeletingShowtimesPrev}
					>
						{isDeletingShowtimesPrev ? (
							'Processing...'
						) : (
							<>
								DELETE
								<TrashIcon className="h-5 w-5" />
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Utils
