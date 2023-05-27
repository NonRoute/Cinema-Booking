import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import Showtimes from './Showtimes'

const Theater = ({ theaterId, movies, selectedDate }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const { auth } = useContext(AuthContext)

	const [theater, setTheater] = useState({})
	const [isAddingShowtime, SetIsAddingShowtime] = useState(false)

	const fetchTheater = async (data) => {
		try {
			const response = await axios.get(`/theater/${theaterId}`)
			// console.log(response.data.data)
			setTheater(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchTheater()
	}, [theaterId])

	const onAddShowtime = async (data) => {
		try {
			SetIsAddingShowtime(true)
			let showtime = new Date(selectedDate)
			const [hours, minutes] = data.showtime.split(':')
			showtime.setHours(hours, minutes, 0)
			const response = await axios.post(
				'/showtime',
				{ movie: data.movie, showtime, theater: theater._id },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			// console.log(response.data)
			fetchTheater()
			toast.success('Add showtime successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
			SetIsAddingShowtime(false)
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
			SetIsAddingShowtime(false)
		}
	}

	return (
		<div className="flex flex-col">
			<div className="flex sm:justify-between">
				<h3 className="flex w-fit items-center rounded-tl-2xl bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-2xl font-bold text-white sm:rounded-t-2xl sm:px-8">
					{theater.number}
				</h3>
				<div className="flex w-fit flex-col items-center gap-x-3 rounded-tr-2xl bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 font-semibold text-white sm:flex-row sm:gap-x-6 sm:rounded-t-2xl sm:text-lg sm:font-bold">
					<div className="flex items-center gap-2">
						<ArrowsUpDownIcon className="h-6 w-6" />
						{theater?.seatPlan?.row === 'A' ? (
							<h4>Row : A</h4>
						) : (
							<h4>Row : A - {theater?.seatPlan?.row}</h4>
						)}
					</div>
					<div className="flex items-center gap-2">
						<ArrowsRightLeftIcon className="h-6 w-6" />
						{theater?.seatPlan?.column === 1 ? (
							<h4>Column : 1</h4>
						) : (
							<h4>Column : 1 - {theater?.seatPlan?.column}</h4>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 rounded-b-md rounded-tr-md bg-gradient-to-br from-indigo-100 to-white py-4 sm:rounded-tr-none">
				<form className="mx-4 flex flex-col gap-y-2 gap-x-4 md:flex-row" onSubmit={handleSubmit(onAddShowtime)}>
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
					<div className="flex grow items-center gap-2">
						<label className="text-lg font-semibold leading-5">Showtime :</label>
						<input
							type="time"
							className="w-12 flex-grow rounded px-2  py-1 font-semibold drop-shadow-sm"
							required
							{...register('showtime', { required: true })}
						/>
					</div>
					<button
						disabled={isAddingShowtime}
						className="rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-500 disabled:from-slate-500 disabled:to-slate-400"
						type="submit"
					>
						{isAddingShowtime ? 'Processing...' : 'ADD +'}
					</button>
				</form>
				<Showtimes showtimes={theater.showtimes} movies={movies} selectedDate={selectedDate} />
			</div>
		</div>
	)
}
export default Theater
