import Navbar from './components/Navbar'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import CinemaLists from './components/CinemaLists'
import TheaterListsByCinema from './components/TheaterListsByCinema'

const Cinema = () => {
	const { auth } = useContext(AuthContext)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(localStorage.getItem('selectedCinemaIndex')) || 0
	)
	const [cinemas, setCinemas] = useState([])
	const [isFetchingCinemasDone, setIsFetchingCinemasDone] = useState(false)

	const fetchCinemas = async (newSelectedCinema) => {
		try {
			setIsFetchingCinemasDone(false)
			const response = await axios.get('/cinema')
			console.log(response.data.data)
			setCinemas(response.data.data)
			if (newSelectedCinema) {
				response.data.data.map((cinema, index) => {
					if (cinema.name === newSelectedCinema) {
						setSelectedCinemaIndex(index)
						localStorage.setItem('selectedCinemaIndex', index)
					}
				})
			}
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
			{cinemas[selectedCinemaIndex]?.name && <TheaterListsByCinema {...props} />}
		</div>
	)
}

export default Cinema
