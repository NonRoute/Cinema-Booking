import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDraggable } from 'react-use-draggable-scroll'
import Loading from './Loading'

const ScheduleTable = ({ cinemaId, selectedDate, auth }) => {
	const ref = useRef(null)
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
	const [isFetchingCinemasDone, setIsFetchingCinemasDone] = useState(false)

	const fetchCinema = async (data) => {
		try {
			setIsFetchingCinemasDone(false)
			const response = await axios.get(`/cinema/${cinemaId}`)
			console.log(response.data.data)
			setCinema(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingCinemasDone(true)
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
				{ movie: data.movie, showtime, theater: data.theater, repeat: data.repeat },
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

	if (!isFetchingCinemasDone) {
		return (
			<div ref={ref}>
				<Loading />
			</div>
		)
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
							if (
								new Date(showtime.showtime).getDate() === selectedDate.getDate() &&
								new Date(showtime.showtime).getMonth() === selectedDate.getMonth() &&
								new Date(showtime.showtime).getYear() === selectedDate.getYear()
							)
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
					className="flex flex-col gap-2 rounded-lg md:flex-row md:items-end"
					onSubmit={handleSubmit(onAddShowtime)}
				>
					<div className="flex grow items-center gap-y-1 gap-x-2 md:flex-col md:items-start">
						<label className="whitespace-nowrap text-lg font-semibold leading-5">Theater :</label>
						<select
							className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
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
					<div className="flex grow-[2] items-center gap-y-1 gap-x-2 md:flex-col md:items-start">
						<label className="whitespace-nowrap text-lg font-semibold leading-5">Movie :</label>
						<select
							className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
							required
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
					<div className="flex items-center gap-y-1 gap-x-2 md:flex-col md:items-start">
						<label className="whitespace-nowrap text-lg font-semibold leading-5">Showtime :</label>
						<input
							type="time"
							className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
							required
							{...register('showtime', { required: true })}
						/>
					</div>
					<div className="flex items-center gap-y-1 gap-x-2 md:flex-col md:items-start">
						<label className="whitespace-nowrap text-lg font-semibold leading-5">Repeat (Day) :</label>
						<input
							type="number"
							min={1}
							defaultValue={1}
							max={1000}
							className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
							required
							{...register('repeat', { required: true })}
						/>
					</div>
					<button
						title="Add showtime"
						disabled={isAddingShowtime}
						className="h-9 whitespace-nowrap rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
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
