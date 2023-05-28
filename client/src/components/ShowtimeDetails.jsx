import { TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const ShowtimeDetails = ({ showDeleteBtn, showtime }) => {
	const { auth } = useContext(AuthContext)
	const navigate = useNavigate()
	
	const handleDelete = (id) => {
		const confirmed = window.confirm(`Do you want to delete this showtime?`)
		if (confirmed) {
			onDeleteShowtime(id)
		}
	}

	const onDeleteShowtime = async (id) => {
		try {
			const response = await axios.delete(`/showtime/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			navigate('/cinema-mgt')
			toast.success('Delete showtime successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		}
	}

	return (
		<>
			<div className="flex justify-between">
				<div className="flex flex-col rounded-tl-lg bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-center font-bold text-white sm:px-8">
					<p className="text-sm">Theater</p>
					<p className="text-3xl">{showtime?.theater?.number}</p>
				</div>
				<div className="flex w-fit grow items-center justify-center rounded-tr-lg bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 text-center text-xl font-bold text-white sm:text-3xl">
					<p>{showtime?.theater?.cinema.name}</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex grow flex-col gap-4 bg-gradient-to-br from-indigo-100 to-white py-4 drop-shadow-lg">
					<div className="flex items-center">
						<img src={showtime?.movie?.img} className="w-32 px-4 drop-shadow-md" />
						<div className="flex flex-col">
							<h4 className="mr-4 text-xl font-semibold sm:text-2xl md:text-3xl">
								{showtime?.movie?.name}
							</h4>
							{showtime?.movie && (
								<p className="mr-4 font-medium sm:text-lg">
									length : {showtime?.movie?.length || '-'} min
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex h-full min-w-fit flex-col items-center justify-center gap-y-1 bg-gradient-to-br from-indigo-100 to-white py-4 text-center text-2xl font-semibold drop-shadow-lg">
						<p className="mx-4">
							{showtime?.showtime
								? `${new Date(showtime?.showtime).toLocaleString('default', { weekday: 'long' })}
                ${new Date(showtime?.showtime).getDate()}
                ${new Date(showtime?.showtime).toLocaleString('default', { month: 'long' })}
                ${new Date(showtime?.showtime).getFullYear()}
                `
								: ''}
						</p>
						<p className="mx-4 bg-gradient-to-r from-indigo-800 to-blue-700 bg-clip-text text-5xl font-bold text-transparent">
							{showtime?.showtime
								? `${new Date(showtime?.showtime).getHours().toString().padStart(2, '0')} : ${new Date(
										showtime?.showtime
								  )
										.getMinutes()
										.toString()
										.padStart(2, '0')}`
								: ''}
						</p>
					</div>
					{showDeleteBtn && (
						<button
							className="flex w-full items-center justify-center gap-1 bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-500 md:min-w-fit"
							onClick={() => handleDelete(showtime?._id)}
						>
							DELETE
							<TrashIcon className="h-5 w-5" />
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default ShowtimeDetails
