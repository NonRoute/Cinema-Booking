import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDraggable } from 'react-use-draggable-scroll'
import Loading from './Loading'

const ScheduleTable = ({ cinemaId, selectedDate }) => {
	const ref = useRef()
	const { events } = useDraggable(ref)
	const [cinema, setCinema] = useState([])

	const fetchCinema = async (data) => {
		try {
			const response = await axios.get(`/cinema/${cinemaId}`)
			console.log(response.data.data)
			setCinema(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinema(cinemaId)
	}, [cinemaId])

	const getRowStart = (showtime) => {
		showtime = new Date(showtime)
		const hour = showtime.getHours()
		const min = showtime.getMinutes()
		return Math.round((60 * hour + min) / 10)
	}

	const getRowSpan = (length) => {
		return Math.round(length / 10)
	}

	return (
		<div
			className={`grid h-full overflow-x-auto grid-cols-${cinema.theaters?.length.toString()} grid-rows-150 rounded-md bg-gradient-to-br from-indigo-100 to-white`}
			{...events}
			ref={ref}
		>
			{cinema.theaters?.map((theater, index) => {
				{
					return theater.showtimes?.map((showtime, index) => {
						if (new Date(showtime.showtime).getDay() === selectedDate.getDay())
							return (
								<Link
									title={`${showtime.movie.name}\n${new Date(showtime.showtime)
										.getHours()
										.toString()
										.padStart(2, '0')} : ${new Date(showtime.showtime)
										.getMinutes()
										.toString()
										.padStart(2, '0')} - ${new Date(
										new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
									)
										.getHours()
										.toString()
										.padStart(2, '0')} : ${new Date(
										new Date(showtime.showtime).getTime() + showtime.movie.length * 60000
									)
										.getMinutes()
										.toString()
										.padStart(2, '0')}
											`}
									key={index}
									className={`overflow-y-scroll row-span-${getRowSpan(
										showtime.movie.length
									)} row-start-${getRowStart(showtime.showtime)} col-start-${
										theater.number
									} mx-1 rounded bg-white p-1 text-center drop-shadow-md hover:bg-gray-50`}
									to={`/showtime/${showtime._id}`}
								>
									<p className="text-sm font-bold">{showtime.movie.name}</p>
									<p>{`${new Date(showtime.showtime)
										.getHours()
										.toString()
										.padStart(2, '0')} : ${new Date(showtime.showtime)
										.getMinutes()
										.toString()
										.padStart(2, '0')}`}</p>
								</Link>
							)
					})
				}
			})}

			{[...Array(cinema.theaters?.length)].map((x, index) => (
				<div
					key={index}
					className="sticky top-0 row-span-1 row-start-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white"
				>
					{index + 1}
				</div>
			))}
		</div>
	)
}

export default ScheduleTable
