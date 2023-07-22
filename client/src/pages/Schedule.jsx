import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CinemaLists from '../components/CinemaLists'
import DatePicker from '../components/DatePicker'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import ScheduleTable from '../components/ScheduleTable'
import { AuthContext } from '../context/AuthContext'

const Schedule = () => {
	const { auth } = useContext(AuthContext)
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm()
	const [selectedDate, setSelectedDate] = useState(
		(sessionStorage.getItem('selectedDate') && new Date(sessionStorage.getItem('selectedDate'))) || new Date()
	)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(sessionStorage.getItem('selectedCinemaIndex')) || 0
	)
	const [cinemas, setCinemas] = useState([])
	const [isFetchingCinemas, setIsFetchingCinemas] = useState(true)
	const [movies, setMovies] = useState()
	const [isAddingShowtime, SetIsAddingShowtime] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState(null)

	const fetchCinemas = async (data) => {
		try {
			setIsFetchingCinemas(true)
			const response = await axios.get('/cinema')
			// console.log(response.data.data)
			setCinemas(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingCinemas(false)
		}
	}

	useEffect(() => {
		fetchCinemas()
	}, [])

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
			if (!data.movie) {
				toast.error('Please select a movie', {
					position: 'top-center',
					autoClose: 2000,
					pauseOnHover: false
				})
				return
			}
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
			fetchCinemas()
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

	const props = {
		cinemas,
		selectedCinemaIndex,
		setSelectedCinemaIndex,
		fetchCinemas,
		auth,
		isFetchingCinemas
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 text-gray-900 sm:gap-8">
			<Navbar />
			<CinemaLists {...props} />
			{selectedCinemaIndex !== null &&
				(cinemas[selectedCinemaIndex]?.theaters?.length ? (
					<div className="mx-4 flex h-screen flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:gap-4 sm:p-6">
						<h2 className="text-3xl font-bold text-gray-900">Schedule</h2>
						<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
						{auth.role === 'admin' && (
							<form
								className="flex flex-col gap-2 rounded-lg md:flex-row md:items-end"
								onSubmit={handleSubmit(onAddShowtime)}
							>
								<div className="flex grow items-center gap-x-2 gap-y-1 md:flex-col md:items-start">
									<label className="whitespace-nowrap text-lg font-semibold leading-5">
										Theater :
									</label>
									<select
										className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
										required
										{...register('theater', { required: true })}
									>
										<option value="" defaultValue>
											Choose a theater
										</option>
										{cinemas[selectedCinemaIndex].theaters?.map((theater, index) => {
											return (
												<option key={index} value={theater._id}>
													{theater.number}
												</option>
											)
										})}
									</select>
								</div>
								<div className="flex grow-[2] items-center gap-x-2 gap-y-1 md:flex-col md:items-start">
									<label className="whitespace-nowrap text-lg font-semibold leading-5">Movie :</label>
									<Select
										value={selectedMovie}
										options={movies?.map((movie) => ({ value: movie._id, label: movie.name }))}
										onChange={(value) => {
											setValue('movie', value.value)
											setSelectedMovie(value)
										}}
										isSearchable={true}
										primaryColor="indigo"
										classNames={{
											menuButton: (value) =>
												'flex font-semibold text-sm border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20'
										}}
									/>
								</div>
								<div className="flex items-center gap-x-2 gap-y-1 md:flex-col md:items-start">
									<label className="whitespace-nowrap text-lg font-semibold leading-5">
										Showtime :
									</label>
									<input
										type="time"
										className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
										required
										{...register('showtime', { required: true })}
									/>
								</div>
								<div className="flex items-center gap-x-2 gap-y-1 md:flex-col md:items-start">
									<label className="whitespace-nowrap text-lg font-semibold leading-5">
										Repeat (Day) :
									</label>
									<input
										type="number"
										min={1}
										defaultValue={1}
										max={31}
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
						{isFetchingCinemas ? (
							<Loading />
						) : (
							cinemas[selectedCinemaIndex]?._id && (
								<ScheduleTable
									cinema={cinemas[selectedCinemaIndex]}
									selectedDate={selectedDate}
									auth={auth}
								/>
							)
						)}
					</div>
				) : (
					<div className="mx-4 flex flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:gap-4 sm:p-6">
						<p className="text-center">There are no theaters available</p>
					</div>
				))}
		</div>
	)
}

export default Schedule
