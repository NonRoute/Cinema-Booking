import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Movie from './Movie'
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path
									fillRule="evenodd"
									d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
									clipRule="evenodd"
								/>
							</svg>
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
											/>
										</svg>
										<div className="flex flex-col items-end my-1">
											<label className="font-semibold text-lg leading-5">Last Row :</label>
											<label className="font-semibold text-xs">(A-Z)</label>
										</div>
										<input
											title="A to Z"
											type="text"
											maxLength="1"
											required
											className="rounded py-1 px-3 w-32 font-semibold text-2xl"
											{...register('row', {
												required: true,
												pattern: /^[a-zA-Z]$/
											})}
										/>
									</div>
									<div className="flex flex-wrap gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
											/>
										</svg>
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
											className="rounded py-1 px-3 w-32 font-semibold text-2xl"
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
						return <Theater key={index} theater={theater} />
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
