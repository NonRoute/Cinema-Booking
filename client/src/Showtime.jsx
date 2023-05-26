import { useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Showtime = () => {
	const { id } = useParams()
	const [showtime, setShowtime] = useState({})

	const fetchShowtime = async (data) => {
		try {
			const response = await axios.get(`/showtime/${id}`)
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
				<div className="bg-gradient-to-br from-indigo-100 to-white rounded-tr-md sm:rounded-tr-none rounded-b-md flex flex-col gap-4 py-4">
					<div className="flex items-center">
						<img src={showtime?.movie?.img} className="w-32 px-4 drop-shadow-md" />
						<div className="flex flex-col py-4 gap-2">
							<div>
								<h4 className="text-2xl font-semibold">{showtime?.movie?.name}</h4>
								<p className="text-md font-medium">length : {showtime?.movie?.length || '-'} min</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Showtime
