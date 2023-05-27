import { StopIcon } from '@heroicons/react/24/solid'
import { memo, useState } from 'react'

const Seat = ({ seat, setSelectedSeats }) => {
	const [isSelected, setIsSelected] = useState(false)
	return isSelected ? (
		<a
			title={`${seat.row}${seat.number}`}
			className="w-fit"
			onClick={() => {
				setIsSelected(false)
				setSelectedSeats((prev) => prev.filter((e) => e !== `${seat.row}${seat.number}`))
			}}
		>
			<StopIcon className="h-8 w-8 text-blue-500" />
		</a>
	) : (
		<a
			title={`${seat.row}${seat.number}`}
			className="w-fit"
			onClick={() => {
				setIsSelected(true)
				setSelectedSeats((prev) => [...prev, `${seat.row}${seat.number}`])
			}}
		>
			<StopIcon className="h-8 w-8 text-white drop-shadow-md" />
		</a>
	)
}

export default memo(Seat)
