import axios from 'axios'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import CinemaLists from './CinemaLists'
import DateSelector from './DateSelector'
import Loading from './Loading'
import TheaterShort from './TheaterShort'

const TheaterListsByMovie = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth }) => {
	const [selectedDate, setSelectedDate] = useState(
		(sessionStorage.getItem('selectedDate') && new Date(sessionStorage.getItem('selectedDate'))) || new Date()
	)
	const [theaters, setTheaters] = useState([])
	const [isFetchingTheatersDone, setIsFetchingTheatersDone] = useState(false)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(sessionStorage.getItem('selectedCinemaIndex'))
	)
	const [cinemas, setCinemas] = useState([])
	const [isFetchingCinemas, setIsFetchingCinemas] = useState(true)

	const fetchCinemas = async (data) => {
		try {
			setIsFetchingCinemas(true)
			let response
			if (auth.role === 'admin') {
				response = await axios.get('/cinema/unreleased', {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
			} else {
				response = await axios.get('/cinema')
			}
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

	const fetchTheaters = async (data) => {
		try {
			setIsFetchingTheatersDone(false)
			let response
			if (auth.role === 'admin') {
				response = await axios.get(
					`/theater/movie/unreleased/${
						movies[selectedMovieIndex]._id
					}/${selectedDate.toISOString()}/${new Date().getTimezoneOffset()}`,
					{
						headers: {
							Authorization: `Bearer ${auth.token}`
						}
					}
				)
			} else {
				response = await axios.get(
					`/theater/movie/${
						movies[selectedMovieIndex]._id
					}/${selectedDate.toISOString()}/${new Date().getTimezoneOffset()}`
				)
			}
			setTheaters(
				response.data.data.sort((a, b) => {
					if (a.cinema.name > b.cinema.name) return 1
					if (a.cinema.name === b.cinema.name && a.number > b.number) return 1
					return -1
				})
			)
			setIsFetchingTheatersDone(true)
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
		auth,
		isFetchingCinemas
	}

	const filteredTheaters = theaters.filter((theater) => {
		if (selectedCinemaIndex === 0 || !!selectedCinemaIndex) {
			return theater.cinema?.name === cinemas[selectedCinemaIndex]?.name
		}
		return true
	})

	return (
		<>
			<CinemaLists {...props} />
			<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 text-gray-900 drop-shadow-md sm:mx-8">
				<div className="flex flex-col gap-6 p-4 sm:p-6">
					<DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
					<div className="flex flex-col gap-4 rounded-md bg-gradient-to-br from-indigo-100 to-white py-4">
						<div className="flex items-center">
							<img src={movies[selectedMovieIndex].img} className="w-32 px-4 drop-shadow-md" />
							<div>
								<h4 className="text-2xl font-semibold">{movies[selectedMovieIndex].name}</h4>
								<p className="text-md font-medium">
									length : {movies[selectedMovieIndex].length || '-'} min
								</p>
							</div>
						</div>
					</div>
					{isFetchingTheatersDone ? (
						<div className="flex flex-col">
							{filteredTheaters.map((theater, index) => {
								return (
									<div
										key={index}
										className={`flex flex-col ${
											index !== 0 &&
											filteredTheaters[index - 1]?.cinema.name !==
												filteredTheaters[index].cinema.name &&
											'mt-6'
										}`}
									>
										{filteredTheaters[index - 1]?.cinema.name !==
											filteredTheaters[index].cinema.name && (
											<div className="rounded-t-md bg-gradient-to-br from-indigo-800 to-blue-700 px-2 py-1.5 text-center text-2xl font-semibold text-white sm:py-2">
												<h2>{theater.cinema.name}</h2>
											</div>
										)}
										<TheaterShort
											theaterId={theater._id}
											movies={movies}
											selectedDate={selectedDate}
											filterMovie={movies[selectedMovieIndex]}
											rounded={
												index == filteredTheaters.length ||
												filteredTheaters[index + 1]?.cinema.name !==
													filteredTheaters[index].cinema.name
											}
										/>
									</div>
								)
							})}
							{filteredTheaters.length === 0 && (
								<p className="text-center text-xl font-semibold text-gray-700">
									There are no showtimes available
								</p>
							)}
						</div>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</>
	)
}

export default TheaterListsByMovie
