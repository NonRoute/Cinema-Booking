import DatePicker from './components/DatePicker'
import CinemaLists from './components/CinemaLists'
import Navbar from './components/Navbar'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect, useState } from 'react'

const Schedule = () => {
	const { auth } = useContext(AuthContext)
	const [selectedDate, setSelectedDate] = useState(
		(localStorage.getItem('selectedDate') && new Date(localStorage.getItem('selectedDate'))) || new Date()
	)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(localStorage.getItem('selectedCinemaIndex')) || 0
	)
	const [cinemas, setCinemas] = useState([])
	const [isFetchingCinemasDone, setIsFetchingCinemasDone] = useState(false)

	const fetchCinemas = async (data) => {
		try {
			setIsFetchingCinemasDone(false)
			const response = await axios.get('/cinema')
			console.log(response.data.data)
			setCinemas(response.data.data)
			setIsFetchingCinemasDone(true)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinemas()
	}, [])

	const props = {
		cinemas,
		selectedCinemaIndex,
		setSelectedCinemaIndex,
		fetchCinemas,
		auth,
		isFetchingCinemasDone
	}

	const theatersLength = cinemas[selectedCinemaIndex]?.theaters.length
	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<CinemaLists {...props} />
			<div className="mx-4 flex h-screen flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:gap-4 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Schedule</h2>
				<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
				<div className="overflow-auto">
					<div
						className={`grid h-full divide-x divide-gray-700 overflow-x-auto grid-cols-${theatersLength} grid-rows-288 rounded-md bg-gradient-to-br from-indigo-100 to-white`}
					>
						{[...Array(theatersLength)].map((x, i) => (
							<div className="sticky top-0 row-span-1 row-start-1 flex w-36 items-center justify-center bg-white text-center text-2xl font-semibold">
								{i + 1}
							</div>
						))}
						<div className="row-span-3 row-start-2 m-4 w-20 rounded bg-white p-4">FF</div>
						<div className="col-start-2 row-span-3 row-start-2 m-4 w-20 rounded bg-white p-4">FF</div>
						<div className="col-start-3 row-span-3 row-start-2 m-4 w-20 rounded bg-white p-4">FF</div>
						<div className="col-start-5 row-span-3 row-start-2 m-4 w-20 rounded bg-white p-4">FF</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Schedule
