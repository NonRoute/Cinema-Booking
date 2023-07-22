import { Fragment, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, TicketIcon, TrashIcon } from '@heroicons/react/24/outline'
import ShowtimeDetails from '../components/ShowtimeDetails'

const User = () => {
	const { auth } = useContext(AuthContext)
	const [users, setUsers] = useState(null)
	const [ticketsUser, setTicketsUser] = useState(null)
	const [tickets, setTickets] = useState([])
	const fetchUsers = async (data) => {
		try {
			// setIsFetchingShowtimesDone(false)
			const response = await axios.get('/auth/user', {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data.data)
			setUsers(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			// setIsFetchingShowtimesDone(true)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 text-gray-900 sm:gap-8">
			<Navbar />
			<div className="mx-4 flex h-fit flex-col gap-2 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Users</h2>
				<div
					className={`mb-4 grid max-h-screen overflow-auto rounded-md bg-gradient-to-br from-indigo-100 to-white`}
					style={{ gridTemplateColumns: 'repeat(3, minmax(max-content, 1fr)) max-content max-content' }}
				>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Username
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Email
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Role
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Tickets
					</p>
					<p className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-700 px-2 py-1 text-center text-xl font-semibold text-white">
						Actions
					</p>
					{users?.map((user, index) => {
						return (
							<Fragment key={index}>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{user.username}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{user.email}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">{user.role}</div>
								<div className="border-t-2 border-indigo-200 px-2 py-1">
									<button
										className={`flex items-center justify-center gap-1 rounded bg-gradient-to-r py-1 pl-2 pr-1.5 text-sm font-medium text-white  disabled:from-slate-500 disabled:to-slate-400
										${
											ticketsUser === user.username
												? 'from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400'
												: 'from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400'
										}`}
										onClick={() => {
											setTickets(user.tickets)
											setTicketsUser(user.username)
										}}
									>
										View {user.tickets.length} tickets
										<TicketIcon className="h-6 w-6" />
									</button>
								</div>
								<div className="flex gap-2 border-t-2 border-indigo-200 px-2 py-1">
									{user.role === 'user' && (
										<button className="flex w-[105px] items-center justify-center gap-1 rounded bg-gradient-to-r from-indigo-600 to-blue-500 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400">
											Set Admin
											<ChevronDoubleUpIcon className="h-5 w-5" />
										</button>
									)}
									{user.role === 'admin' && (
										<button className="flex w-[105px] items-center justify-center gap-1 rounded bg-gradient-to-r from-indigo-600 to-blue-500 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400">
											Set User
											<ChevronDoubleDownIcon className="h-5 w-5" />
										</button>
									)}
									<button className="flex items-center justify-center gap-1 rounded bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-500 disabled:from-slate-500 disabled:to-slate-400">
										DELETE
										<TrashIcon className="h-5 w-5" />
									</button>
								</div>
							</Fragment>
						)
					})}
				</div>
				{ticketsUser && (
					<>
						<h2 className="text-2xl font-bold text-gray-900">Viewing {ticketsUser}'s tickets</h2>
						{tickets.length === 0 ? (
							<p className="text-center">This user have not purchased any tickets yet</p>
						) : (
							<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1920px]:grid-cols-3">
								{tickets.map((ticket, index) => {
									return (
										<div className="flex flex-col" key={index}>
											<ShowtimeDetails showtime={ticket.showtime} />
											<div className="flex h-full flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
												<div className="flex h-full flex-col items-center gap-x-4 px-4 py-2 md:flex-row">
													<p className="whitespace-nowrap font-semibold">Seats : </p>
													<p>
														{ticket.seats.map((seat) => seat.row + seat.number).join(', ')}
													</p>
													<p className="whitespace-nowrap">({ticket.seats.length} seats)</p>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default User
