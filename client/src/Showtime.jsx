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
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<div className="flex justify-between">
					<div className="items-center rounded-tl-2xl bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-center font-bold text-white sm:px-8">
						<p className="text-sm">Theater</p>
						<p className="text-3xl">{showtime?.theater?.number}</p>
					</div>
					<div className="flex w-fit grow items-center justify-center rounded-tr-2xl bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 text-center text-xl font-bold text-white sm:text-3xl">
						<p className="">{showtime?.theater?.cinema.name}</p>
					</div>
				</div>

				<div className="flex flex-col gap-y-2 sm:flex-row">
					<div className="flex grow flex-col gap-4 rounded-b-md bg-gradient-to-br from-indigo-100 to-white py-4 drop-shadow-lg sm:rounded-none sm:rounded-bl-md">
						<div className="flex items-center">
							<img src={showtime?.movie?.img} className="w-32 px-4 drop-shadow-md" />
							<div className="flex flex-col justify-between">
								<h4 className="text-2xl font-semibold">{showtime?.movie?.name}</h4>
								<p className="text-md font-medium">length : {showtime?.movie?.length || '-'} min</p>
							</div>
						</div>
					</div>
					<div className="flex grow flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-100 to-white py-4 text-center text-2xl font-semibold drop-shadow-lg sm:rounded-none sm:rounded-br-md">
						<p className="">
							{`${new Date(showtime?.showtime).toLocaleString('default', { weekday: 'long' })}
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
