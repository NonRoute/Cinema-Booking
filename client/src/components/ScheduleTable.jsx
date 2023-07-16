import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDraggable } from 'react-use-draggable-scroll'


const ScheduleTable = ({ cinema, selectedDate, auth }) => {
	const ref = useRef(null)
	const { events } = useDraggable(ref)

	const getRowStart = (showtime) => {
		showtime = new Date(showtime)
		const hour = showtime.getHours()
		const min = showtime.getMinutes()
		return Math.round((60 * hour + min) / 10)
	}

	const getRowSpan = (length) => {
		return Math.round(length / 10)
	}

	const getRowStartRange = () => {
		let firstRowStart = 100000
		let lastRowEnd = 0
		let count = 0
		cinema.theaters.forEach((theater, index) => {
			theater.showtimes.forEach((showtime, index) => {
				if (
					new Date(showtime.showtime).getDate() === selectedDate.getDate() &&
					new Date(showtime.showtime).getMonth() === selectedDate.getMonth() &&
					new Date(showtime.showtime).getYear() === selectedDate.getYear()
				) {
					const rowStart = getRowStart(showtime.showtime)
					if (rowStart < firstRowStart) {
						firstRowStart = rowStart
					}
					if (rowStart + getRowSpan(showtime.movie.length) > lastRowEnd) {
						lastRowEnd = rowStart + getRowSpan(showtime.movie.length)
					}
					count++
				}
			})
		})
		return [firstRowStart, lastRowEnd, count]
	}

	const getTodayShowtimes = (theater) => {
		return theater.showtimes?.filter((showtime, index) => {
			return (
				new Date(showtime.showtime).getDate() === selectedDate.getDate() &&
				new Date(showtime.showtime).getMonth() === selectedDate.getMonth() &&
				new Date(showtime.showtime).getYear() === selectedDate.getYear()
			)
		})
	}

	const firstRowStart = getRowStartRange()[0]
	const gridRows = Math.max(1, getRowStartRange()[1] - getRowStartRange()[0])
	const showtimeCount = getRowStartRange()[2]
	const shiftStart = 3
	const shiftEnd = 2

	return (
		<>
			<div
				className={`grid h-screen overflow-x-auto grid-cols-${cinema.theaters?.length.toString()} grid-rows-${
					gridRows + shiftEnd
				} rounded-md bg-gradient-to-br from-indigo-100 to-white`}
				{...events}
				ref={ref}
			>
				{cinema.theaters?.map((theater, index) => {
					{
						return getTodayShowtimes(theater)?.map((showtime, index) => {
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
									)} row-start-${
										getRowStart(showtime.showtime) - firstRowStart + shiftStart
									} col-start-${
										theater.number
									} mx-1 rounded bg-white p-1 text-center drop-shadow-md hover:bg-gray-50`}
									to={`/showtime/${showtime._id}`}
								>
									<p className="text-sm font-bold">{showtime.movie.name}</p>
									<p className="text-sm leading-3">{`${new Date(showtime.showtime)
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
										.padStart(2, '0')}`}</p>
								</Link>
							)
						})
					}
				})}

				{showtimeCount === 0 && (
					<div className="col-span-full row-start-3 flex items-center justify-center text-xl font-semibold text-gray-700">
						There are no showtimes available
					</div>
				)}

				{[...Array(cinema.theaters?.length)].map((x, index) => (
					<div
						key={index}
						className="sticky top-0 row-span-1 row-start-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 text-center text-2xl font-semibold text-white"
					>
						{index + 1}
					</div>
				))}
			</div>
		</>
	)
}

export default ScheduleTable
