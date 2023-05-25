import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TrashIcon, ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import Theater from './Theater'

const Cinema = ({ cinemas, selectedCinemaIndex, setSelectedCinemaIndex, fetchCinemas, auth }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const handleDelete = (cinema) => {
		const confirmed = window.confirm(`Do you want to delete cinema ${cinema.name}?`)
		if (confirmed) {
			onDeleteCinema(cinema._id)
		}
	}

	const onDeleteCinema = async (id) => {
		try {
			const response = await axios.delete(`/cinema/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			setSelectedCinemaIndex(null)
			fetchCinemas()
			toast.success('Delete cinema successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	const onIncreaseTheater = async (data) => {
		try {
			const response = await axios.post(
				`/theater`,
				{
					cinema: cinemas[selectedCinemaIndex]._id,
					number: cinemas[selectedCinemaIndex].theaters.length + 1,
					row: data.row.toUpperCase(),
					column: data.column
				},
				{
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				}
			)
			console.log(response.data)
			fetchCinemas()
			toast.success('Increase theater successful!')
		} catch (error) {
			console.error(error)
			toast.error(errors)
		}
	}

	const handleDecreaseTheater = (cinema) => {
		const confirmed = window.confirm(
			`Do you want to delete theater ${cinemas[selectedCinemaIndex].theaters.length}?`
		)
		if (confirmed) {
			onDecreaseTheater()
		}
	}

	const onDecreaseTheater = async () => {
		try {
			const response = await axios.delete(`/theater/${cinemas[selectedCinemaIndex].theaters.slice(-1)[0]._id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			fetchCinemas()
			toast.success('Decrease theater successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}
	return (
		<>
			<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-4 sm:mx-8 rounded-md">
				<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-md text-white text-center py-1.5 px-2 text-2xl font-semibold">
					<div className="flex justify-center items-center">
						<span className="flex-grow">{cinemas[selectedCinemaIndex]?.name}</span>
						<button
							className="flex gap-1 items-center text-white text-sm font-medium bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-700 hover:to-rose-600 rounded-md pl-2 pr-1.5 py-1 w-fit"
							onClick={() => handleDelete(cinemas[selectedCinemaIndex])}
						>
							DELETE
							<TrashIcon className="h-5 w-5" />
						</button>
					</div>
				</div>
				<div className="flex flex-col p-4 sm:p-6 gap-6 drop-shadow-xl">
					<form className="flex flex-col gap-2" onSubmit={handleSubmit(onIncreaseTheater)}>
						<div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
							<h2 className="text-gray-900 font-bold text-3xl">Theaters</h2>
							<div className="flex flex-wrap gap-4 drop-shadow-md items-center justify-end bg-gradient-to-br from-indigo-100 to-white p-2 rounded-md">
								<div className="flex flex-wrap gap-4 justify-end">
									<div className="flex flex-wrap gap-2">
										<ArrowsUpDownIcon className="h-6 w-6" />
										<div className="flex flex-col items-end my-1">
											<label className="font-semibold text-lg leading-5">Last Row :</label>
											<label className="font-semibold text-xs">(A-ZZ)</label>
										</div>
										<input
											title="A to ZZ"
											type="text"
											maxLength="2"
											required
											className="rounded py-1 px-3 w-14 font-semibold text-2xl drop-shadow-sm"
											{...register('row', {
												required: true,
												pattern: /^[a-zA-Z]{1,2}$/
											})}
										/>
									</div>
									<div className="flex flex-wrap gap-2">
										<ArrowsRightLeftIcon className="h-6 w-6" />
										<div className="flex flex-col items-end my-1">
											<label className="font-semibold text-lg leading-5">Last Column :</label>
											<label className="font-semibold text-xs">(1-500)</label>
										</div>
										<input
											title="1 to 500"
											type="number"
											min="1"
											max="500"
											maxLength="3"
											required
											className="rounded py-1 px-3 w-24 font-semibold text-2xl drop-shadow-sm"
											{...register('column', { required: true })}
										/>
									</div>
								</div>
								<button
									className="drop-shadow-md flex items-center text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1"
									type="submit"
								>
									INCREASE +
								</button>
							</div>
						</div>
					</form>
					{cinemas[selectedCinemaIndex].theaters.map((theater, index) => {
						return <Theater key={index} theater={theater} number={index + 1} />
					})}
					<div className="flex justify-center">
						<button
							className="drop-shadow-md text-white font-medium bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 rounded-md px-2 py-1 w-fit"
							onClick={() => handleDecreaseTheater()}
						>
							DECREASE -
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Cinema
