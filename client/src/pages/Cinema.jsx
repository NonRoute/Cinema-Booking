import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import CinemaLists from '../components/CinemaLists'
import Navbar from '../components/Navbar'
import TheaterListsByCinema from '../components/TheaterListsByCinema'
import { AuthContext } from '../context/AuthContext'

const Cinema = () => {
	const { auth } = useContext(AuthContext)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(
		parseInt(sessionStorage.getItem('selectedCinemaIndex')) || 0
	)
	const [cinemas, setCinemas] = useState([])
	const [isFetchingCinemas, setIsFetchingCinemas] = useState(true)

	const fetchCinemas = async (newSelectedCinema) => {
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
			if (newSelectedCinema) {
				response.data.data.map((cinema, index) => {
					if (cinema.name === newSelectedCinema) {
						setSelectedCinemaIndex(index)
						sessionStorage.setItem('selectedCinemaIndex', index)
					}
				})
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingCinemas(false)
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
		isFetchingCinemas
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
