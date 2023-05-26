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
			toast.success('Add showtime successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	return (
		<div className="flex flex-col">
			<div className="flex sm:justify-between">
				<h3 className="flex items-center bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-tl-2xl sm:rounded-t-2xl w-fit px-4 sm:px-8 py-0.5">
					{theater.number}
				</h3>
				<div className="flex flex-col sm:flex-row items-center gap-x-3 sm:gap-x-6 bg-gradient-to-br from-indigo-800 to-blue-700 text-white font-semibold sm:font-bold sm:text-lg rounded-tr-2xl sm:rounded-t-2xl w-fit px-4 py-0.5">
					<div className="flex gap-2 items-center">
						<ArrowsUpDownIcon className="h-6 w-6" />
						{theater?.seatPlan?.row === 'A' ? (
							<h4>Row : A</h4>
						) : (
							<h4>Row : A - {theater?.seatPlan?.row}</h4>
						)}
					</div>
					<div className="flex gap-2 items-center">
						<ArrowsRightLeftIcon className="h-6 w-6" />
						{theater?.seatPlan?.column === 1 ? (
							<h4>Column : 1</h4>
						) : (
							<h4>Column : 1 - {theater?.seatPlan?.column}</h4>
						)}
					</div>
				</div>
			</div>
			<div className="bg-gradient-to-br from-indigo-100 to-white rounded-tr-md sm:rounded-tr-none rounded-b-md flex flex-col gap-4 py-4">
				<form className="flex flex-col md:flex-row gap-y-2 gap-x-4 mx-4" onSubmit={handleSubmit(onAddShowtime)}>
					<div className="flex gap-2 items-center grow-[5]">
						<label className="font-semibold text-lg leading-5">Movie :</label>
						<select
							className="bg-white flex-grow drop-shadow-sm text-gray-900 font-medium rounded-md px-2 py-1 w-12"
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
					<div className="flex gap-2 items-center grow">
						<label className="font-semibold text-lg leading-5">Showtime :</label>
						<input
							type="time"
							className="flex-grow rounded px-2 py-1  font-semibold drop-shadow-sm w-12"
							required
							{...register('showtime', { required: true })}
						/>
					</div>
					<button
						className="drop-shadow-md text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1"
						type="submit"
					>
						ADD +
					</button>
				</form>
				<Showtimes showtimes={theater.showtimes} movies={movies} selectedDate={selectedDate} />
			</div>
		</div>
	)
}
export default Theater
