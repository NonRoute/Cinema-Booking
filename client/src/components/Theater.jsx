import { useEffect, useState } from 'react'
import Movie from './Movie'
import axios from 'axios'
import { ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Theater = ({ theater, number, movies }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const onAddShowtime = async (data) => {
		try {
			console.log(data)
			// const response = await axios.post(
			// 	'/theater/showtime',
			// 	{ movie: data.movie },
			// 	{
			// 		headers: {
			// 			Authorization: `Bearer ${auth.token}`
			// 		}
			// 	}
			// )
			// console.log(response.data)
			// fetchCinemas()
			toast.success('Add cinema successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<h3 className="bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-t-2xl w-fit px-8 py-0.5">
					{number}
				</h3>
				<div className="flex items-center gap-6 bg-gradient-to-br from-indigo-800 to-blue-700 text-white font-bold text-lg rounded-t-2xl w-fit px-4 py-0.5">
					<div className="flex gap-2 items-center">
						<ArrowsUpDownIcon className="h-6 w-6" />
						{theater.seatPlan.row === 'A' ? <h4>Row : A</h4> : <h4>Row : A - {theater.seatPlan.row}</h4>}
					</div>
					<div className="flex gap-2 items-center">
						<ArrowsRightLeftIcon className="h-6 w-6" />
						{theater.seatPlan.column === 1 ? (
							<h4>Column : 1</h4>
						) : (
							<h4>Column : 1 - {theater.seatPlan.column}</h4>
						)}
					</div>
				</div>
			</div>
			<div className="bg-gradient-to-br from-indigo-100 to-white rounded-b-md flex flex-col gap-4 py-4">
				<form className="flex flex-col md:flex-row gap-y-2 gap-x-4 mx-4" onSubmit={handleSubmit(onAddShowtime)}>
					<div className="flex gap-2 items-center grow-[5]">
						<label className="font-semibold text-lg leading-5">Movie :</label>
						<select
							className="bg-white flex-grow drop-shadow-sm text-gray-900 font-medium rounded-md px-2 py-1"
							{...register('movie', { required: true })}
						>
							<option value="" selected>
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
							className="flex-grow rounded px-2 py-1  font-semibold drop-shadow-sm"
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
				<Movie />
				<Movie />
			</div>
		</div>
	)
}
export default Theater
