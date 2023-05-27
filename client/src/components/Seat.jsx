import { memo, useState } from 'react'

const Seat = ({ seat, setSelectedSeats }) => {
	const [isSelected, setIsSelected] = useState(false)
	return isSelected ? (
		<button
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 items-center justify-center"
			onClick={() => {
				setIsSelected(false)
				setSelectedSeats((prev) => prev.filter((e) => e !== `${seat.row}${seat.number}`))
			}}
		>
			<div className="h-6 w-6 rounded bg-blue-500 drop-shadow-md"></div>
		</button>
	) : (
		<button
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 items-center justify-center "
			onClick={() => {
				setIsSelected(true)
				setSelectedSeats((prev) => [...prev, `${seat.row}${seat.number}`])
			}}
		>
			<div className="h-6 w-6 rounded bg-white drop-shadow-md"></div>
		</button>
	)
}

export default memo(Seat)
