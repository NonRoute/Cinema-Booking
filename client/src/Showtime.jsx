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
				<div className="flex justify-between">
					<div className="items-center text-center bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold rounded-tl-2xl px-4 sm:px-8 py-0.5">
						<p className="text-sm">Theater</p>
						<p className="text-3xl">{showtime?.theater?.number}</p>
					</div>
					<div className="grow flex items-center justify-center text-center bg-gradient-to-br from-indigo-800 to-blue-700 text-white font-bold text-xl sm:text-3xl rounded-tr-2xl w-fit px-4 py-0.5">
						<p className="">{showtime?.theater?.cinema.name}</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-y-2">
					<div className="grow bg-gradient-to-br from-indigo-100 to-white drop-shadow-lg rounded-b-md sm:rounded-none sm:rounded-bl-md flex flex-col gap-4 py-4">
						<div className="flex items-center">
							<img src={showtime?.movie?.img} className="w-32 px-4 drop-shadow-md" />
							<div className="flex flex-col justify-between">
								<h4 className="text-2xl font-semibold">{showtime?.movie?.name}</h4>
								<p className="text-md font-medium">length : {showtime?.movie?.length || '-'} min</p>
							</div>
						</div>
					</div>
					<div className="grow bg-gradient-to-br from-indigo-100 to-white drop-shadow-lg rounded-md sm:rounded-none sm:rounded-br-md flex flex-col text-center items-center justify-center gap-2 font-semibold text-2xl py-4">
						<p className="">
							{`${new Date(showtime?.showtime).toLocaleString('default', {
								weekday: 'long'
							})}
                                        ${new Date(showtime?.showtime).getDate()}
                                        ${new Date(showtime?.showtime).toLocaleString('default', { month: 'long' })}
                                        ${new Date(showtime?.showtime).getFullYear()}
                                    
                                    `}
						</p>
						<p className="">
							{`${new Date(showtime?.showtime).getHours().toString().padStart(2, '0')} : ${new Date(
								showtime?.showtime
							)
								.getMinutes()
								.toString()
								.padStart(2, '0')}`}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Showtime
