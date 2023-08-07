import { ArrowsRightLeftIcon, ArrowsUpDownIcon, InformationCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import Loading from './Loading'
import Showtimes from './Showtimes'

const Theater = ({ theaterId, movies, selectedDate, filterMovie, setSelectedDate }) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		watch,
		formState: { errors }
	} = useForm()

	const { auth } = useContext(AuthContext)

	const [theater, setTheater] = useState({})
	const [isFetchingTheaterDone, setIsFetchingTheaterDone] = useState(false)
	const [isAddingShowtime, SetIsAddingShowtime] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState(null)

	const fetchTheater = async (data) => {
		try {
			setIsFetchingTheaterDone(false)
			let response
			if (auth.role === 'admin') {
				response = await axios.get(`/theater/unreleased/${theaterId}`, {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
			} else {
				response = await axios.get(`/theater/${theaterId}`)
			}
			// console.log(response.data.data)
			setTheater(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingTheaterDone(true)
		}
	}

	useEffect(() => {
		fetchTheater()
	}, [theaterId])

	useEffect(() => {
		setValue('autoIncrease', true)
		setValue('rounding5', true)
		setValue('gap', '00:10')
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
				{ movie: data.movie, showtime, theater: theater._id, repeat: data.repeat, isRelease: data.isRelease },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			// console.log(response.data)
			fetchTheater()
			if (data.autoIncrease) {
				const movieLength = movies.find((movie) => movie._id === data.movie).length
				const [GapHours, GapMinutes] = data.gap.split(':').map(Number)
				const nextShowtime = new Date(showtime.getTime() + (movieLength + GapHours * 60 + GapMinutes) * 60000)
				if (data.rounding5 || data.rounding10) {
					const totalMinutes = nextShowtime.getHours() * 60 + nextShowtime.getMinutes()
					const roundedMinutes = data.rounding5
						? Math.ceil(totalMinutes / 5) * 5
						: Math.ceil(totalMinutes / 10) * 10
					let roundedHours = Math.floor(roundedMinutes / 60)
					const remainderMinutes = roundedMinutes % 60
					if (roundedHours === 24) {
						nextShowtime.setDate(nextShowtime.getDate() + 1)
						roundedHours = 0
					}
					setValue(
						'showtime',
						`${String(roundedHours).padStart(2, '0')}:${String(remainderMinutes).padStart(2, '0')}`
					)
				} else {
					setValue(
						'showtime',
						`${String(nextShowtime.getHours()).padStart(2, '0')}:${String(
							nextShowtime.getMinutes()
						).padStart(2, '0')}`
					)
				}
				if (data.autoIncreaseDate) {
					setSelectedDate(nextShowtime)
					sessionStorage.setItem('selectedDate', nextShowtime)
				}
			}
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

	function rowToNumber(column) {
		let result = 0
		for (let i = 0; i < column.length; i++) {
			const charCode = column.charCodeAt(i) - 64 // Convert character to ASCII and adjust to 1-based index
			result = result * 26 + charCode
		}
		return result
	}

	if (!isFetchingTheaterDone) {
		return <Loading />
	}

	return (
		<div className="flex flex-col">
			<div className="flex md:justify-between">
				<h3
					className={`flex w-fit items-center rounded-tl-2xl bg-gradient-to-br from-gray-800 to-gray-700 px-6 py-0.5 text-2xl font-bold text-white md:rounded-t-2xl md:px-8 ${
						auth.role !== 'admin' && 'rounded-t-2xl'
					}`}
				>
					{theater.number}
				</h3>
				{auth.role === 'admin' && (
					<div className="flex w-fit flex-col gap-x-3 rounded-tr-2xl bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 font-semibold text-white md:flex-row md:gap-x-6 md:rounded-t-2xl md:text-lg md:font-bold">
						<div className="flex items-center gap-2">
							<ArrowsUpDownIcon className="h-5 w-5" />
							{theater?.seatPlan?.row === 'A' ? (
								<h4>Row : A</h4>
							) : (
								<h4>Row : A - {theater?.seatPlan?.row}</h4>
							)}
						</div>
						<div className="flex items-center gap-2">
							<ArrowsRightLeftIcon className="h-5 w-5" />
							{theater?.seatPlan?.column === 1 ? (
								<h4>Column : 1</h4>
							) : (
								<h4>Column : 1 - {theater?.seatPlan?.column}</h4>
							)}
						</div>
						<div className="flex items-center gap-2">
							<UserIcon className="h-5 w-5" />
							{(rowToNumber(theater.seatPlan.row) * theater.seatPlan.column).toLocaleString('en-US')}{' '}
							Seats
						</div>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-4 rounded-b-md rounded-tr-md bg-gradient-to-br from-indigo-100 to-white py-4 md:rounded-tr-none">
				{auth.role === 'admin' && (
					<>
						<form
							className="mx-4 flex flex-col gap-x-4 gap-y-2 lg:flex-row"
							onSubmit={handleSubmit(onAddShowtime)}
						>
							<div className="flex grow flex-col gap-2 rounded-lg">
								<div className="flex flex-col gap-2 rounded-lg lg:flex-row lg:items-stretch">
									<div className="flex grow-[2] items-center gap-x-2 gap-y-1 lg:flex-col lg:items-start">
										<label className="whitespace-nowrap text-lg font-semibold leading-5">
											Movie:
										</label>
										<Select
											value={selectedMovie}
											options={movies?.map((movie) => ({
												value: movie._id,
												label: movie.name
											}))}
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
									<div className="flex items-center gap-x-2 gap-y-1 lg:flex-col lg:items-start">
										<label className="whitespace-nowrap text-lg font-semibold leading-5">
											Showtime:
										</label>
										<input
											type="time"
											className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm"
											required
											{...register('showtime', { required: true })}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-2 rounded-lg lg:flex-row lg:items-stretch">
									<div className="flex items-center gap-x-2 gap-y-1 lg:flex-col lg:items-start">
										<label className="whitespace-nowrap text-lg font-semibold leading-5">
											Repeat (Day):
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
									<label className="flex items-center gap-x-2 gap-y-1 whitespace-nowrap text-lg font-semibold leading-5 lg:flex-col lg:items-start">
										Release now:
										<input
											type="checkbox"
											className="h-6 w-6 lg:h-9 lg:w-9"
											{...register('isRelease')}
										/>
									</label>
									<div className="flex flex-col items-start gap-2 lg:flex-row lg:items-end">
										<p className="font-semibold text-right underline">Auto increase</p>
										<label
											className="flex items-center gap-x-2 gap-y-1 whitespace-nowrap font-semibold leading-5 lg:flex-col lg:items-start"
											title="After add, update showtime value to the movie ending time"
										>
											Showtime:
											<input
												type="checkbox"
												className="h-6 w-6 lg:h-9 lg:w-9"
												{...register('autoIncrease')}
											/>
										</label>
										<label
											className="flex items-center gap-x-2 gap-y-1 whitespace-nowrap font-semibold leading-5 lg:flex-col lg:items-start"
											title="After add, update date value to the movie ending time"
										>
											Date:
											<input
												type="checkbox"
												className="h-6 w-6 lg:h-9 lg:w-9"
												disabled={!watch('autoIncrease')}
												{...register('autoIncreaseDate')}
											/>
										</label>
									</div>
									<div
										className="flex items-center gap-x-2 gap-y-1 lg:flex-col lg:items-start"
										title="Gap between showtimes"
									>
										<label className="whitespace-nowrap font-semibold leading-5">Gap:</label>
										<input
											type="time"
											className="h-9 w-full rounded bg-white px-2 py-1 font-semibold text-gray-900 drop-shadow-sm disabled:bg-gray-300"
											disabled={!watch('autoIncrease')}
											{...register('gap')}
										/>
									</div>
									<div className="flex flex-col items-start gap-2 lg:flex-row lg:items-end">
										<p className="font-semibold text-right underline">Rounding</p>
										<label
											className="flex items-center gap-x-2 gap-y-1 whitespace-nowrap font-semibold leading-5 lg:flex-col lg:items-start"
											title="Rounding up to the nearest five minutes"
										>
											5-min:
											<input
												type="checkbox"
												className="h-6 w-6 lg:h-9 lg:w-9"
												disabled={!watch('autoIncrease')}
												{...register('rounding5', {
													onChange: () => setValue('rounding10', false)
												})}
											/>
										</label>
										<label
											className="flex items-center gap-x-2 gap-y-1 whitespace-nowrap font-semibold leading-5 lg:flex-col lg:items-start"
											title="Rounding up to the nearest ten minutes"
										>
											10-min:
											<input
												type="checkbox"
												className="h-6 w-6 lg:h-9 lg:w-9"
												disabled={!watch('autoIncrease')}
												{...register('rounding10', {
													onChange: () => setValue('rounding5', false)
												})}
											/>
										</label>
									</div>
								</div>
							</div>
							<button
								title="Add showtime"
								disabled={isAddingShowtime}
								className="whitespace-nowrap rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
								type="submit"
							>
								ADD +
							</button>
						</form>
						{filterMovie?.name && (
							<div className="mx-4 flex gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500 p-2 text-white">
								<InformationCircleIcon className="h-6 w-6" />
								{`You are viewing the showtimes of "${filterMovie?.name}"`}
							</div>
						)}
					</>
				)}
				<Showtimes
					showtimes={theater.showtimes}
					movies={movies}
					selectedDate={selectedDate}
					filterMovie={filterMovie}
				/>
			</div>
		</div>
	)
}
export default Theater
