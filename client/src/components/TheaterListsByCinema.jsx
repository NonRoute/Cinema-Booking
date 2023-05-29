import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TrashIcon, ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import Theater from './Theater'
import { useEffect, useState } from 'react'
import DatePicker from './DatePicker'

const TheaterListsByCinema = ({ cinemas, selectedCinemaIndex, setSelectedCinemaIndex, fetchCinemas, auth }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const [movies, setMovies] = useState()
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [isIncreasing, SetIsIncreaseing] = useState(false)

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

	const handleDelete = (cinema) => {
		const confirmed = window.confirm(`Do you want to delete cinema ${cinema.name}?`)
		if (confirmed) {
			onDeleteCinema(cinema._id)
		}
	}

	const onDeleteCinema = async (id) => {
		try {
			const response = await axios.delete(`/cinema/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			setSelectedCinemaIndex(null)
			fetchCinemas()
			toast.success('Delete cinema successful!', {
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

	const onIncreaseTheater = async (data) => {
		try {
			SetIsIncreaseing(true)
			const response = await axios.post(
				`/theater`,
				{
					cinema: cinemas[selectedCinemaIndex]._id,
					number: cinemas[selectedCinemaIndex].theaters.length + 1,
					row: data.row.toUpperCase(),
					column: data.column
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			console.log(response.data)
			fetchCinemas()
			toast.success('Increase theater successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
			SetIsIncreaseing(false)
		} catch (error) {
			console.error(error)
			toast.error(errors, {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
			SetIsIncreaseing(false)
		}
	}

	const handleDecreaseTheater = (cinema) => {
		const confirmed = window.confirm(
			`Do you want to delete theater ${cinemas[selectedCinemaIndex].theaters.length}?`
		)
		if (confirmed) {
			onDecreaseTheater()
		}
	}

	const onDecreaseTheater = async () => {
		try {
			const response = await axios.delete(`/theater/${cinemas[selectedCinemaIndex].theaters.slice(-1)[0]}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			fetchCinemas()
			toast.success('Decrease theater successful!', {
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
		<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 drop-shadow-md sm:mx-8">
			<div className="flex items-center justify-center rounded-t-md bg-gradient-to-br from-gray-900 to-gray-800 py-1.5 px-2 text-center text-2xl font-semibold text-white sm:py-2">
				<span className="flex-grow text-2xl sm:text-3xl">{cinemas[selectedCinemaIndex]?.name}</span>
				{auth.role === 'admin' && (
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-700 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600"
						onClick={() => handleDelete(cinemas[selectedCinemaIndex])}
					>
						DELETE
						<TrashIcon className="h-5 w-5" />
					</button>
				)}
			</div>
			<div className="flex flex-col gap-6 p-4 sm:p-6">
				<div className="rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 p-2">
					<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
				</div>

				<form className="flex flex-col gap-2" onSubmit={handleSubmit(onIncreaseTheater)}>
					<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
						<h2 className="text-3xl font-bold text-gray-900">Theaters</h2>
						{auth.role === 'admin' && (
							<div className="flex flex-wrap items-center justify-end gap-4 rounded-md bg-gradient-to-br from-indigo-100 to-white p-2">
								<div className="flex flex-wrap justify-end gap-4">
									<div className="flex flex-wrap gap-2">
										<ArrowsUpDownIcon className="h-6 w-6" />
										<div className="my-1 flex flex-col items-end">
											<label className="text-lg font-semibold leading-5">Last Row :</label>
											<label className="text-xs font-semibold">(A-DZ)</label>
										</div>
										<input
											title={errors.row ? errors.row.message : 'A to DZ'}
											type="text"
											maxLength="2"
											required
											className={`w-14 rounded py-1 px-3 text-2xl font-semibold drop-shadow-sm
													${errors.row && 'border-2 border-red-500'}`}
											{...register('row', {
												required: true,
												pattern: {
													value: /^([A-Da-d][A-Za-z]|[A-Za-z])$/,
													message: 'Invalid row'
												}
											})}
										/>
									</div>
									<div className="flex flex-wrap gap-2">
										<ArrowsRightLeftIcon className="h-6 w-6" />
										<div className="my-1 flex flex-col items-end">
											<label className="text-lg font-semibold leading-5">Last Column :</label>
											<label className="text-xs font-semibold">(1-120)</label>
										</div>
										<input
											title={errors.column ? errors.column.message : '1 to 120'}
											type="number"
											min="1"
											max="120"
											maxLength="3"
											required
											className={`w-24 rounded py-1 px-3 text-2xl font-semibold drop-shadow-sm ${
												errors.column && 'border-2 border-red-500'
											}`}
											{...register('column', { required: true })}
										/>
									</div>
								</div>
								<button
									disabled={isIncreasing}
									className="flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
									type="submit"
								>
									{isIncreasing ? 'Processing...' : 'INCREASE +'}
								</button>
							</div>
						)}
					</div>
				</form>
				{cinemas[selectedCinemaIndex].theaters.map((theater, index) => {
					return <Theater key={index} theaterId={theater} movies={movies} selectedDate={selectedDate} />
				})}
				{auth.role === 'admin' && cinemas[selectedCinemaIndex].theaters.length > 0 && (
					<div className="flex justify-center">
						<button
							className="w-fit rounded-md bg-gradient-to-r from-red-600 to-rose-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-red-500 hover:to-rose-400"
							onClick={() => handleDecreaseTheater()}
						>
							DECREASE -
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default TheaterListsByCinema
