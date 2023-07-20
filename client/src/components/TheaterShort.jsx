import { InformationCircleIcon, UserIcon, ArrowsRightLeftIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import Loading from './Loading'
import Showtimes from './Showtimes'
import Select from 'react-tailwindcss-select'

const TheaterShort = ({ theaterId, movies, selectedDate, filterMovie, rounded = false }) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
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
			const response = await axios.get(`/theater/${theaterId}`)
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

	const onAddShowtime = async (data) => {
		try {
			SetIsAddingShowtime(true)
			let showtime = new Date(selectedDate)
			const [hours, minutes] = data.showtime.split(':')
			showtime.setHours(hours, minutes, 0)
			const response = await axios.post(
				'/showtime',
				{ movie: data.movie, showtime, theater: theater._id, repeat: data.repeat },
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
		<div
			className={`flex flex-col bg-gradient-to-br from-indigo-100 to-white sm:flex-row sm:rounded-tr-none ${
				rounded && 'rounded-b-md'
			}`}
		>
			<div className="flex flex-col sm:flex-row">
				<div
					className={`flex min-w-[120px] flex-row items-center justify-center gap-x-2 bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-2xl font-bold text-white sm:flex-col ${
						rounded && 'sm:rounded-bl-md'
					}`}
				>
					<p className="text-sm">Theater</p>
					{theater.number}
				</div>
				<div
					className={`flex w-full min-w-[160px] flex-row items-center justify-center gap-x-4 border-b-2 border-indigo-200 bg-gradient-to-br from-indigo-100 to-white px-4 py-0.5 text-sm font-bold sm:w-fit sm:flex-col sm:border-none`}
				>
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
						{(rowToNumber(theater.seatPlan.row) * theater.seatPlan.column).toLocaleString('en-US')} Seats
					</div>
				</div>
			</div>
			<div className="mx-4 flex items-center">
				<Showtimes
					showtimes={theater.showtimes}
					movies={movies}
					selectedDate={selectedDate}
					filterMovie={filterMovie}
					showMovieDetail={false}
				/>
			</div>
		</div>
	)
}
export default TheaterShort
