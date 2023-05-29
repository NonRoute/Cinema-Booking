import { Link, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Seat from './components/Seat'
import { TicketIcon } from '@heroicons/react/24/solid'
import ShowtimeDetails from './components/ShowtimeDetails'
import { AuthContext } from './context/AuthContext'

const Showtime = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	const [showtime, setShowtime] = useState({})
	const [selectedSeats, setSelectedSeats] = useState([])
	const sortedSelectedSeat = selectedSeats.sort((a, b) => {
		const [rowA, numberA] = a.match(/([A-Za-z]+)(\d+)/).slice(1)
		const [rowB, numberB] = b.match(/([A-Za-z]+)(\d+)/).slice(1)
		if (rowA === rowB) {
			if (parseInt(numberA) > parseInt(numberB)) {
				return 1
			} else {
				return -1
			}
		} else if (rowA.length > rowB.length) {
			return 1
		} else if (rowA.length < rowB.length) {
			return -1
		} else if (rowA > rowB) {
			return 1
		}
		return -1
	})

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

	const row = showtime?.theater?.seatPlan?.row
	let rowLetters = []
	if (row) {
		for (let k = 64; k <= (row.length === 2 ? row.charCodeAt(0) : 64); k++) {
			for (
				let i = 65;
				i <= (k === row.charCodeAt(0) || row.length === 1 ? row.charCodeAt(row.length - 1) : 90);
				i++
			) {
				const letter = k === 64 ? String.fromCharCode(i) : String.fromCharCode(k) + String.fromCharCode(i)
				rowLetters.push(letter)
			}
		}
	}

	const column = showtime?.theater?.seatPlan.column
	let colNumber = []
	for (let k = 1; k <= column; k++) {
		colNumber.push(k)
	}

	const isPast = (date) => {
		console.log(date, new Date(date) < new Date())
		return new Date(date) < new Date()
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 h-fit rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<ShowtimeDetails showtime={showtime} showDeleteBtn={true} />

				<div className="flex flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
					<div className="flex flex-col items-center gap-x-4 py-2 px-4 md:flex-row">
						{!isPast(showtime.showtime) && <p className="font-semibold">Selected Seats : </p>}
						<p className="text-start">{sortedSelectedSeat.join(', ')}</p>
						{!!selectedSeats.length && <p className="whitespace-nowrap">({selectedSeats.length} seats)</p>}
					</div>
					{!!selectedSeats.length && (
						<Link
							to={auth.role ? `/purchase/${id}` : '/login'}
							state={{
								selectedSeats: sortedSelectedSeat,
								showtime
							}}
							className="flex items-center justify-center gap-2 rounded-b-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-4 font-semibold text-white hover:from-indigo-500 hover:to-blue-500 md:rounded-none md:rounded-br-lg"
						>
							<p>Purchase</p>
							<TicketIcon className="h-7 w-7 text-white" />
						</Link>
					)}
				</div>

				<div className="mx-auto mt-4 flex flex-col items-center rounded-lg bg-gradient-to-br from-indigo-100 to-white p-4 text-center drop-shadow-lg">
					<div className="w-full rounded-lg bg-white">
						<div className="bg-gradient-to-r from-indigo-800 to-blue-700 bg-clip-text text-xl font-bold text-transparent">
							Screen
						</div>
					</div>
					<div className="flex w-full flex-col overflow-x-auto overflow-y-hidden">
						<div className="m-auto my-2">
							<div className="flex flex-col">
								<div className="flex items-center">
									<div className="flex h-8 w-8 items-center">
										<p className="w-8"></p>
									</div>
									{colNumber.map((col, index) => {
										return (
											<div key={index} className="flex h-8 w-8 items-center">
												<p className="w-8 font-semibold">{col}</p>
											</div>
										)
									})}
								</div>
								{rowLetters.map((rowLetter, index) => {
									return (
										<div key={index} className="flex">
											<div className="flex h-8 w-8 items-center">
												<p className="w-8 text-xl font-semibold">{rowLetter}</p>
											</div>
											{showtime?.seats
												.filter((seat) => seat.row === rowLetter)
												.map((seat, index) => {
													return (
														<Seat
															key={index}
															seat={seat}
															setSelectedSeats={setSelectedSeats}
															selectable={!isPast(showtime.showtime)}
														/>
													)
												})}
											<div className="flex h-8 w-8 items-center">
												<p className="w-8 text-xl font-semibold">{rowLetter}</p>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Showtime
