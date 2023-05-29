import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TrashIcon, ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import Theater from './Theater'
import { useEffect, useState } from 'react'
import DatePicker from './DatePicker'
import CinemaLists from './CinemaLists'

const TheaterListsByMovie = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth }) => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [theaters, setTheaters] = useState([])
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(localStorage.getItem('selectedCinemaIndex'))
	)
	const [cinemas, setCinemas] = useState([])

	const fetchCinemas = async (data) => {
		try {
			const response = await axios.get('/cinema')
			// console.log(response.data.data)
			setCinemas(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinemas()
	}, [])

	const fetchTheaters = async (data) => {
		try {
			console.log(movies[selectedMovieIndex]._id, selectedDate)
			const response = await axios.get(
				`/theater/movie/${movies[selectedMovieIndex]._id}/${selectedDate.toISOString()}`
			)
			console.log(response.data.data)
			setTheaters(
				response.data.data.sort((a, b) => {
					if (a.cinema.name > b.cinema.name) return 1
					if (a.cinema.name === b.cinema.name && a.number > b.number) return 1
					return -1
				})
			)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchTheaters()
	}, [selectedMovieIndex, selectedDate])

	const props = {
		cinemas,
		selectedCinemaIndex,
		setSelectedCinemaIndex,
		fetchCinemas,
		auth
	}

	const filteredTheaters = theaters.filter((theater) => {
		if (selectedCinemaIndex === 0 || !!selectedCinemaIndex) {
			return theater.cinema.name === cinemas[selectedCinemaIndex].name
		}
		return true
	})

	console.log(filteredTheaters)

	return (
		<>
			<CinemaLists {...props} />
			<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 drop-shadow-md sm:mx-8">
				<div className="flex flex-col gap-6 p-4 sm:p-6">
					<div className="rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 p-2">
						<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
					</div>
					{filteredTheaters.map((theater, index) => {
						if (filteredTheaters[index - 1]?.cinema.name !== filteredTheaters[index].cinema.name) {
							return (
								<div key={index} className="flex flex-col gap-6">
									<div className="rounded-md bg-gradient-to-br from-gray-900 to-gray-800 py-1.5 px-2 text-center text-2xl font-semibold text-white sm:py-2">
										<h2>{theater.cinema.name}</h2>
									</div>
									<Theater
										theaterId={theater._id}
										movies={movies}
										selectedDate={selectedDate}
										filterMovie={movies[selectedMovieIndex]}
									/>
								</div>
							)
						}
						return (
							<Theater
								key={index}
								theaterId={theater._id}
								movies={movies}
								selectedDate={selectedDate}
								filterMovie={movies[selectedMovieIndex]}
							/>
						)
					})}
					{filteredTheaters.length === 0 && (
						<p className="text-center text-xl font-semibold text-gray-700">
							There are no showtimes available
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default TheaterListsByMovie
