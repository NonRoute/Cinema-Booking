import { CheckIcon } from '@heroicons/react/24/outline'
import { memo, useState } from 'react'

const Seat = ({ seat, setSelectedSeats, selectable, isAvailable }) => {
	const [isSelected, setIsSelected] = useState(false)
	return !isAvailable ? (
		<button
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 cursor-not-allowed items-center justify-center"
		>
			<div className="h-6 w-6 rounded bg-gray-500 drop-shadow-md"></div>
		</button>
	) : isSelected ? (
		<button
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 items-center justify-center"
			onClick={() => {
				setIsSelected(false)
				setSelectedSeats((prev) => prev.filter((e) => e !== `${seat.row}${seat.number}`))
			}}
		>
			<div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 drop-shadow-md">
				<CheckIcon className="h-5 w-5 stroke-[3] text-white" />
			</div>
		</button>
	) : (
		<button
			title={`${seat.row}${seat.number}`}
			className={`flex h-8 w-8 items-center justify-center ${!selectable && 'cursor-not-allowed'}`}
			onClick={() => {
				if (selectable) {
					setIsSelected(true)
					setSelectedSeats((prev) => [...prev, `${seat.row}${seat.number}`])
				}
			}}
		>
			<div className="h-6 w-6 rounded bg-white drop-shadow-md"></div>
		</button>
	)
}

export default memo(Seat)
