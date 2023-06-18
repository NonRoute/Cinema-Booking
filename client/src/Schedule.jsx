import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import CinemaLists from './components/CinemaLists'
import DatePicker from './components/DatePicker'
import Navbar from './components/Navbar'
import ScheduleTable from './components/ScheduleTable'
import { AuthContext } from './context/AuthContext'

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

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<CinemaLists {...props} />
			{cinemas[selectedCinemaIndex]?.theaters?.length ? (
				<div className="mx-4 flex h-screen flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:gap-4 sm:p-6">
					<h2 className="text-3xl font-bold text-gray-900">Schedule</h2>
					<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
					{cinemas[selectedCinemaIndex]?._id && (
						<ScheduleTable
							cinemaId={cinemas[selectedCinemaIndex]?._id}
							selectedDate={selectedDate}
							auth={auth}
						/>
					)}
				</div>
			) : (
				<div className="mx-4 flex flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:gap-4 sm:p-6">
					<p className="text-center">There are no theaters available</p>
				</div>
			)}
		</div>
	)
}

export default Schedule
