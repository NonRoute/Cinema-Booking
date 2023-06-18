import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDraggable } from 'react-use-draggable-scroll'
import Loading from './Loading'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ScheduleTable = ({ cinemaId, selectedDate, auth }) => {
	const ref = useRef()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()
	const { events } = useDraggable(ref)
	const [cinema, setCinema] = useState([])
	const [movies, setMovies] = useState()
	const [isAddingShowtime, SetIsAddingShowtime] = useState(false)

	const fetchCinema = async (data) => {
		try {
			const response = await axios.get(`/cinema/${cinemaId}`)
			console.log(response.data.data)
			setCinema(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinema(cinemaId)
	}, [cinemaId])

	const getRowStart = (showtime) => {
		showtime = new Date(showtime)
		const hour = showtime.getHours()
		const min = showtime.getMinutes()
		return Math.round((60 * hour + min) / 10)
	}

	const getRowSpan = (length) => {
		return Math.round(length / 10)
	}

	const fetchMovies = async (data) => {
		try {
			const response = await axios.get('/movie')
			// console.log(response.data.data)
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const onAddShowtime = async (data) => {
		try {
			SetIsAddingShowtime(true)
			let showtime = new Date(selectedDate)
			const [hours, minutes] = data.showtime.split(':')
			showtime.setHours(hours, minutes, 0)
			const response = await axios.post(
				'/showtime',
				{ movie: data.movie, showtime, theater: data.theater },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			// console.log(response.data)
			fetchCinema(cinemaId)
			toast.success('Add showtime successful!', {
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
			SetIsAddingShowtime(false)
		}
	}

	return (
		<>
			<div
				className={`grid h-screen overflow-x-auto grid-cols-${cinema.theaters?.length.toString()} grid-rows-150 rounded-md bg-gradient-to-br from-indigo-100 to-white`}
				{...events}
				ref={ref}
			>
				{cinema.theaters?.map((theater, index) => {
					{
						return theater.showtimes?.map((showtime, index) => {
							if (new Date(showtime.showtime).getDay() === selectedDate.getDay())
								return (
									<Link
										title={`${showtime.movie.name}\n${new Date(showtime.showtime)
											.getHours()
											.toString()
											.padStart(2, '0')} : ${new Date(showtime.showtime)
											.getMinutes()
											.toString()
											.padStart(2, '0')} - ${new Date(
											new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
										)
											.getHours()
											.toString()
											.padStart(2, '0')} : ${new Date(
											new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
										)
											.getMinutes()
											.toString()
											.padStart(2, '0')}
											`}
										key={index}
										className={`overflow-y-scroll row-span-${getRowSpan(
											showtime.movie.length
										)} row-start-${getRowStart(showtime.showtime)} col-start-${
											theater.number
										} mx-1 rounded bg-white p-1 text-center drop-shadow-md hover:bg-gray-50`}
										to={`/showtime/${showtime._id}`}
									>
										<p className="text-sm font-bold">{showtime.movie.name}</p>
										<p className="text-sm leading-3">{`${new Date(showtime.showtime)
											.getHours()
											.toString()
											.padStart(2, '0')} : ${new Date(showtime.showtime)
											.getMinutes()
											.toString()
											.padStart(2, '0')} - ${new Date(
											new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
										)
											.getHours()
											.toString()
											.padStart(2, '0')} : ${new Date(
											new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
										)
											.getMinutes()
											.toString()
											.padStart(2, '0')}`}</p>
									</Link>
								)
						})
					}
				})}

				{[...Array(cinema.theaters?.length)].map((x, index) => (
					<div
						key={index}
						className="sticky top-0 row-span-1 row-start-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white"
					>
						{index + 1}
					</div>
				))}
			</div>

			{auth.role === 'admin' && (
				<form
					className="flex flex-col gap-2 gap-y-2 gap-x-4 rounded-lg md:flex-row"
					onSubmit={handleSubmit(onAddShowtime)}
				>
					<div className="flex grow items-center gap-2">
						<label className="text-lg font-semibold leading-5">Theater :</label>
						<select
							className="w-12 flex-grow rounded-md bg-white px-2 py-1 font-medium text-gray-900 drop-shadow-sm"
							required
							{...register('theater', { required: true })}
						>
							<option value="" defaultValue>
								Choose a theater
							</option>
							{cinema.theaters?.map((theater, index) => {
								return (
									<option key={index} value={theater._id}>
										{theater.number}
									</option>
								)
							})}
						</select>
					</div>
					<div className="flex grow-[5] items-center gap-2">
						<label className="text-lg font-semibold leading-5">Movie :</label>
						<select
							className="w-12 flex-grow rounded-md bg-white px-2 py-1 font-medium text-gray-900 drop-shadow-sm"
							{...register('movie', { required: true })}
						>
							<option value="" defaultValue>
								Choose a movie
							</option>
							{movies?.map((movie, index) => {
								return (
									<option key={index} value={movie._id}>
										{movie.name}
									</option>
								)
							})}
						</select>
					</div>
					<div className="flex grow-[2] items-center gap-2">
						<label className="text-lg font-semibold leading-5">Showtime :</label>
						<input
							type="time"
							className="w-12 flex-grow rounded px-2  py-1 font-semibold drop-shadow-sm"
							required
							{...register('showtime', { required: true })}
						/>
					</div>
					<button
						title="Add showtime"
						disabled={isAddingShowtime}
						className="rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
						type="submit"
					>
						{isAddingShowtime ? 'Processing...' : 'ADD +'}
					</button>
				</form>
			)}
		</>
	)
}

export default ScheduleTable
