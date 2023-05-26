import { useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Showtime = () => {
	const { id } = useParams()
	const [showtime, setShowtime] = useState({})

	const fetchShowtime = async (data) => {
		try {
			const response = await axios.get(`/theater/showtime/${id}`, {
                theater
            })
			console.log(response.data.data)
			setShowtime(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchShowtime()
	}, [])

	return (
		<div className="flex flex-col gap-4 sm:gap-8 bg-gradient-to-br from-indigo-900 to-blue-500 min-h-screen pb-8">
			<Navbar />
			<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-4 sm:mx-8 p-4 sm:p-6 rounded-md drop-shadow-xl">
				SSF
			</div>
		</div>
	)
}

export default Showtime
