import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const ShowtimeDetails = ({ showDeleteBtn, showtime, fetchShowtime }) => {
	const { auth } = useContext(AuthContext)
	const navigate = useNavigate()
	const [isDeletingShowtimes, SetIsDeletingShowtimes] = useState(false)
	const [isReleasingShowtime, setIsReleasingShowtime] = useState(false)
	const [isUnreleasingShowtime, setIsUnreleasingShowtime] = useState(false)

	const handleDelete = () => {
		const confirmed = window.confirm(`Do you want to delete this showtime, including its tickets?`)
		if (confirmed) {
			onDeleteShowtime()
		}
	}

	const onDeleteShowtime = async () => {
		try {
			SetIsDeletingShowtimes(true)
			const response = await axios.delete(`/showtime/${showtime._id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
			navigate('/cinema')
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
		} finally {
			SetIsDeletingShowtimes(false)
		}
	}

	const handleReleaseShowtime = () => {
		const confirmed = window.confirm(`Do you want to release this showtime?`)
		if (confirmed) {
			onReleaseShowtime()
		}
	}

	const onReleaseShowtime = async () => {
		setIsReleasingShowtime(true)
		try {
			const response = await axios.put(
				`/showtime/${showtime._id}`,
				{ isRelease: true },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			await fetchShowtime()
			toast.success(`Release showtime successful!`, {
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
		} finally {
			setIsReleasingShowtime(false)
		}
	}

	const handleUnreleasedShowtime = () => {
		const confirmed = window.confirm(`Do you want to unreleased this showtime?`)
		if (confirmed) {
			onUnreleasedShowtime()
		}
	}

	const onUnreleasedShowtime = async () => {
		setIsUnreleasingShowtime(true)
		try {
			const response = await axios.put(
				`/showtime/${showtime._id}`,
				{ isRelease: false },
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			await fetchShowtime()
			toast.success(`Unreleased showtime successful!`, {
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
		} finally {
			setIsUnreleasingShowtime(false)
		}
	}

	return (
		<>
			{showDeleteBtn && auth.role === 'admin' && (
				<div className="mb-4 flex justify-end gap-2">
					{!showtime.isRelease && (
						<button
							title="Edit cinema name"
							className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500  py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
							onClick={() => handleReleaseShowtime(true)}
							disabled={isReleasingShowtime}
						>
							{isReleasingShowtime ? (
								'Processing...'
							) : (
								<>
									RELEASE
									<EyeIcon className="h-5 w-5" />
								</>
							)}
						</button>
					)}
					{showtime.isRelease && (
						<button
							title="Edit cinema name"
							className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-indigo-600 to-blue-500  py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
							onClick={() => handleUnreleasedShowtime(true)}
							disabled={isUnreleasingShowtime}
						>
							{isUnreleasingShowtime ? (
								'Processing...'
							) : (
								<>
									UNRELEASE
									<EyeSlashIcon className="h-5 w-5" />
								</>
							)}
						</button>
					)}
					<button
						className="flex w-fit items-center gap-1 rounded-md bg-gradient-to-r from-red-700 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-600 disabled:from-slate-500 disabled:to-slate-400"
						onClick={() => handleDelete()}
						disabled={isDeletingShowtimes}
					>
						{isDeletingShowtimes ? (
							'Processing...'
						) : (
							<>
								DELETE
								<TrashIcon className="h-5 w-5" />
							</>
						)}
					</button>
				</div>
			)}
			<div className="flex justify-between">
				<div className="flex flex-col justify-center rounded-tl-lg bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-0.5 text-center font-bold text-white sm:px-8">
					<p className="text-sm">Theater</p>
					<p className="text-3xl">{showtime?.theater?.number}</p>
				</div>
				<div className="flex w-fit grow items-center justify-center rounded-tr-lg bg-gradient-to-br from-indigo-800 to-blue-700 px-4 py-0.5 text-center text-xl font-bold text-white sm:text-3xl">
					<p className="mx-auto">{showtime?.theater?.cinema.name}</p>
					{!showtime?.isRelease && <EyeSlashIcon className="h-8 w-8" title="Unreleased showtime" />}
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex grow flex-col gap-4 bg-gradient-to-br from-indigo-100 to-white py-2 drop-shadow-lg sm:py-4">
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
					<div className="flex h-full min-w-max flex-col items-center justify-center gap-y-1 bg-gradient-to-br from-indigo-100 to-white py-2 text-center text-xl font-semibold drop-shadow-lg sm:py-4 sm:text-2xl md:items-start">
						<p className="mx-4 text-lg leading-4 ">
							{showtime?.showtime &&
								`${new Date(showtime?.showtime).toLocaleString('default', { weekday: 'long' })}`}
						</p>
						<p className="mx-4 ">
							{showtime?.showtime &&
								`${new Date(showtime?.showtime).getDate()}
               					 ${new Date(showtime?.showtime).toLocaleString('default', { month: 'long' })}
                				${new Date(showtime?.showtime).getFullYear()}`}
						</p>
						<p className="mx-4 bg-gradient-to-r from-indigo-800 to-blue-700 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
							{showtime?.showtime &&
								`${new Date(showtime?.showtime).getHours().toString().padStart(2, '0')} : ${new Date(
									showtime?.showtime
								)
									.getMinutes()
									.toString()
									.padStart(2, '0')}`}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShowtimeDetails
