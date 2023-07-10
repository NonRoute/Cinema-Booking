import { ArrowDownIcon, TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import { Fragment } from 'react'
import Select from 'react-tailwindcss-select'
import { FunnelIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Loading from './components/Loading'

const Utils = () => {
	const { auth } = useContext(AuthContext)
	const [isDeletingShowtimes, setIsDeletingShowtimes] = useState(false)
	const [isDeletingShowtimesPrev, setIsDeletingShowtimesPrev] = useState(false)
	const [isDeletingCheckedShowtimes, setIsDeletingCheckedShowtimes] = useState(false)
	const [deletedCheckedShowtimes, setDeletedCheckedShowtimes] = useState(0)
	const [isFetchingShowtimesDone, setIsFetchingShowtimesDone] = useState(false)

	const [showtimes, setShowtimes] = useState([])
	const [filterCinema, setFilterCinema] = useState(null)
	const [filterTheater, setFilterTheater] = useState(null)
	const [filterMovie, setFilterMovie] = useState(null)
	const [filterDate, setFilterDate] = useState(null)
	const [filterTime, setFilterTime] = useState(null)
	const [isCheckAll, setIsCheckAll] = useState(false)
	const [checkedShowtimes, setCheckedShowtimes] = useState([])

	const filteredShowtimes = showtimes.filter((showtime) => {
		const showtimeDate = new Date(showtime.showtime)
		const year = showtimeDate.getFullYear()
		const month = showtimeDate.toLocaleString('default', { month: 'short' })
		const day = showtimeDate.getDate().toString().padStart(2, '0')
		const formattedDate = `${day} ${month} ${year}`
		const hours = showtimeDate.getHours().toString().padStart(2, '0')
		const minutes = showtimeDate.getMinutes().toString().padStart(2, '0')
		const formattedTime = `${hours} : ${minutes}`
		return (
			(!filterCinema || filterCinema.map((cinema) => cinema.value).includes(showtime.theater.cinema._id)) &&
			(!filterTheater || filterTheater.map((theater) => theater.value).includes(showtime.theater.number)) &&
			(!filterMovie || filterMovie.map((movie) => movie.value).includes(showtime.movie._id)) &&
			(!filterDate || filterDate.map((showtime) => showtime.value).includes(formattedDate)) &&
			(!filterTime || filterTime.map((showtime) => showtime.value).includes(formattedTime))
		)
	})

	const fetchShowtimes = async (data) => {
		try {
			setIsFetchingShowtimesDone(false)
			const response = await axios.get('/showtime')
			// console.log(response.data.data)
			setShowtimes(response.data.data)
			return response
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingShowtimesDone(true)
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
			resetState()
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
			resetState()
		}
	}

	const handleDeleteCheckedShowtimes = () => {
		const confirmed = window.confirm(
			`Do you want to delete ${checkedShowtimes.length} checked showtimes, including its tickets?`
		)
		if (confirmed) {
			onDeleteCheckedShowtimes()
		}
	}

	const onDeleteCheckedShowtimes = async () => {
		setIsDeletingCheckedShowtimes(true)
		setDeletedCheckedShowtimes(0)
		const deletePromises = checkedShowtimes.map(async (checkedShowtime) => {
			try {
				const response = await axios.delete(`/showtime/${checkedShowtime}`, {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				setDeletedCheckedShowtimes((prev) => prev + 1)
				return response
			} catch (error) {
				console.error(error)
				toast.error('Error deleting checked showtime', {
					position: 'top-center',
					autoClose: 2000,
					pauseOnHover: false
				})
			}
		})
		await Promise.all(deletePromises)
		await resetState()
		toast.success(`Delete ${deletedCheckedShowtimes} checked showtimes successful!`, {
			position: 'top-center',
			autoClose: 2000,
			pauseOnHover: false
		})
		setIsDeletingCheckedShowtimes(false)
	}

	const resetState = () => {
		setIsCheckAll(false)
		setCheckedShowtimes([])
		return fetchShowtimes()
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 flex h-fit flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Search Showtimes</h2>
				<div className="flex flex-col rounded-md bg-gradient-to-br from-indigo-100 to-white p-4">
					<div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
						<FunnelIcon className="h-6 w-6" />
						Filter
					</div>
					<h4 className="pt-1 text-lg font-bold text-gray-800">Cinema</h4>
					<Select
						value={filterCinema}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.theater.cinema._id))).map(
							(value) => ({
								value,
								label: showtimes.find((showtime) => showtime.theater.cinema._id === value).theater
									.cinema.name
							})
						)}
						onChange={(value) => {
							setFilterCinema(value)
							setIsCheckAll(false)
							setCheckedShowtimes([])
						}}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<h4 className="pt-1 text-lg font-bold text-gray-800">Theater</h4>
					<Select
						value={filterTheater}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.theater.number))).map(
							(value) => ({
								value,
								label: value.toString()
							})
						)}
						onChange={(value) => {
							setFilterTheater(value)
							setIsCheckAll(false)
							setCheckedShowtimes([])
						}}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<h4 className="pt-1 text-lg font-bold text-gray-800">Movie</h4>
					<Select
						value={filterMovie}
						options={Array.from(new Set(showtimes.map((showtime) => showtime.movie._id))).map((value) => ({
							value,
							label: showtimes.find((showtime) => showtime.movie._id === value).movie.name
						}))}
						onChange={(value) => {
							setFilterMovie(value)
							setIsCheckAll(false)
							setCheckedShowtimes([])
						}}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<h4 className="pt-1 text-lg font-bold text-gray-800">Date</h4>
					<Select
						value={filterDate}
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
						onChange={(value) => {
							setFilterDate(value)
							setIsCheckAll(false)
							setCheckedShowtimes([])
						}}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
					<h4 className="pt-1 text-lg font-bold text-gray-800">Time</h4>
					<Select
						value={filterTime}
						options={Array.from(
							new Set(
								showtimes.map((showtime) => {
									const showtimeDate = new Date(showtime.showtime)
									const hours = showtimeDate.getHours().toString().padStart(2, '0')
									const minutes = showtimeDate.getMinutes().toString().padStart(2, '0')
									return `${hours} : ${minutes}`
								})
							)
						).map((value) => ({
							value,
							label: value
						}))}
						onChange={(value) => {
							setFilterTime(value)
							setIsCheckAll(false)
							setCheckedShowtimes([])
						}}
						isMultiple={true}
						isSearchable={true}
						primaryColor="indigo"
					/>
				</div>

				<div className="flex justify-between">
					<div className="flex items-center gap-2 px-1">
						<ArrowDownIcon className="h-6 w-6" />
						<button
							className="flex w-fit items-center justify-center gap-1 rounded bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-500 disabled:from-slate-500 disabled:to-slate-400 md:min-w-fit"
							onClick={() => handleDeleteCheckedShowtimes()}
							disabled={checkedShowtimes.length === 0 || isDeletingCheckedShowtimes}
						>
							{isDeletingCheckedShowtimes ? (
								`${deletedCheckedShowtimes} / ${checkedShowtimes.length} showtimes deleted`
							) : (
								<>
									{`Delete ${checkedShowtimes.length} checked showtimes`}
									<TrashIcon className="h-5 w-5" />
								</>
							)}
						</button>
					</div>

					<div className="flex items-center gap-1 px-1 text-sm font-medium">
						<InformationCircleIcon className="h-5 w-5" /> Showing {filteredShowtimes.length} filtered
						showtimes
					</div>
				</div>

				<div
					className={`mb-4 grid max-h-screen overflow-auto rounded-md bg-gradient-to-br from-indigo-100 to-white`}
					style={{ gridTemplateColumns: '34px repeat(5, minmax(max-content, 1fr))' }}
				>
					<p className="sticky top-0 flex items-center justify-center rounded-tl-md bg-gradient-to-br from-gray-800 to-gray-700 text-center text-xl font-semibold text-white">
						<input
							type="checkbox"
							className="h-6 w-6 rounded"
							checked={isCheckAll}
							onChange={() => {
								if (isCheckAll) {
									setIsCheckAll(false)
									setCheckedShowtimes([])
								} else {
									setIsCheckAll(true)
									setCheckedShowtimes((prev) => [
										...prev,
										...filteredShowtimes.map((showtime) => showtime._id)
									])
								}
							}}
						/>
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Cinema
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Theater
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Movie
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Date
					</p>
					<p className="sticky top-0 rounded-tr-md bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Time
					</p>
					{filteredShowtimes.map((showtime, index) => {
						const showtimeDate = new Date(showtime.showtime)
						const year = showtimeDate.getFullYear()
						const month = showtimeDate.toLocaleString('default', { month: 'short' })
						const day = showtimeDate.getDate().toString().padStart(2, '0')
						const hours = showtimeDate.getHours().toString().padStart(2, '0')
						const minutes = showtimeDate.getMinutes().toString().padStart(2, '0')
						return (
							<Fragment key={index}>
								<div className="flex items-center justify-center border-t-2 border-indigo-200">
									<input
										id={showtime._id}
										type="checkbox"
										className="h-6 w-6 rounded"
										checked={checkedShowtimes.includes(showtime._id)}
										onChange={(e) => {
											const { id, checked } = e.target
											setCheckedShowtimes((prev) => [...prev, id])
											if (!checked) {
												setCheckedShowtimes((prev) => prev.filter((item) => item !== id))
											}
										}}
									/>
								</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">
									{showtime.theater.cinema.name}
								</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{showtime.theater.number}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{showtime.movie.name}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{`${day} ${month} ${year}`}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{`${hours} : ${minutes}`}</div>
							</Fragment>
						)
					})}
				</div>
				{!isFetchingShowtimesDone && <Loading />}
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold">Delete all showtimes</p>
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600 disabled:from-slate-500 disabled:to-slate-400"
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
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600 disabled:from-slate-500 disabled:to-slate-400"
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
