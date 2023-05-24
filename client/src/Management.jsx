import Navbar from './components/Navbar'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import CinemaLists from './components/CinemaLists'
import Cinema from './components/Cinema'

const Management = () => {
	const { auth } = useContext(AuthContext)
	const [selectedCinemaIndex, setSelectedCinemaIndex] = useState(null)
	const [cinemas, setCinemas] = useState([])

	const fetchCinemas = async (data) => {
		try {
			const response = await axios.get('/cinema')
			console.log(response.data.data)
			setCinemas(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinemas()
	}, [])

	const props = { cinemas, selectedCinemaIndex, setSelectedCinemaIndex, fetchCinemas, auth }
	return (
		<div className="flex flex-col gap-4 sm:gap-8 bg-gradient-to-br from-indigo-900 to-blue-500 min-h-screen pb-8">
			<Navbar />
			<CinemaLists {...props} />
			{cinemas[selectedCinemaIndex]?.name && <Cinema {...props} />}
		</div>
	)
}

export default Management
