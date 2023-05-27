import { Link, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TicketIcon } from '@heroicons/react/24/solid'
import ShowtimeDetails from './components/ShowtimeDetails'

const Purchase = () => {
	const location = useLocation()
	const showtime = location.state.showtime
	const selectedSeats = location.state.selectedSeats || []

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 h-fit rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<ShowtimeDetails showtime={showtime} />
				<div className="flex flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
					<div className="flex flex-col items-center gap-x-4 py-2 px-4 md:flex-row">
						<p className="font-semibold">Selected Seats : </p>
						<p className="text-start">{selectedSeats.sort().join(', ')}</p>
						{!!selectedSeats.length && <p className="whitespace-nowrap">({selectedSeats.length} seats)</p>}
					</div>
					{!!selectedSeats.length && (
						<Link
							// to={`/purchase/${id}`}
							state={selectedSeats.sort()}
							className="flex items-center justify-center gap-2 rounded-b-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-4 font-semibold text-white hover:from-indigo-500 hover:to-blue-500 md:rounded-none md:rounded-br-lg"
						>
							<p>Confirm Purchase</p>
							<TicketIcon className="h-7 w-7 text-white" />
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Purchase
