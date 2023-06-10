import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

const ScheduleTable = ({ cinemaId }) => {
	const ref = useRef()
	const { events } = useDraggable(ref)
	const [cinema, setCinema] = useState([])

	const fetchCinema = async (data) => {
		try {
			// setIsFetchingCinemasDone(false)
			const response = await axios.get(`/cinema/${cinemaId}`)
			console.log(response.data.data)
			setCinema(response.data.data)
			// setIsFetchingCinemasDone(true)
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
			className={`grid h-full overflow-x-auto grid-cols-${cinema.theaters?.length.toString()} grid-rows-144 rounded-md bg-gradient-to-br from-indigo-100 to-white`}
			{...events}
			ref={ref}
		>
			{cinema.theaters?.map((theater, index) => {
				{
					return theater.showtimes?.map((showtime, index) => {
						return (
							<div
								key={index}
								className={`overflow-y-scroll row-span-${getRowSpan(
									showtime.movie.length
								)} row-start-${getRowStart(showtime.showtime)} col-start-${
									theater.number
								} mx-1 rounded bg-white p-1 text-center drop-shadow-lg`}
							>
								<p className="text-sm font-bold">{showtime.movie.name}</p>
								<p>{`${new Date(showtime.showtime).getHours().toString().padStart(2, '0')} : ${new Date(
									showtime.showtime
								)
									.getMinutes()
									.toString()
									.padStart(2, '0')}`}</p>
							</div>
						)
					})
				}
			})}

			{[...Array(cinema.theaters?.length)].map((x, index) => (
				<div
					key={index}
					className="sticky top-0 row-span-1 row-start-1 flex items-center justify-center bg-white text-center text-2xl font-semibold drop-shadow-lg"
				>
					{index + 1}
				</div>
			))}
		</div>
	)
}

export default ScheduleTable
