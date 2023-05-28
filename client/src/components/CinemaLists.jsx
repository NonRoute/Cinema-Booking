import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CinemaLists = ({ cinemas, selectedCinemaIndex, setSelectedCinemaIndex, fetchCinemas, auth }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const onAddCinema = async (data) => {
		try {
			const response = await axios.post('/cinema', data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
			reset()
			fetchCinemas()
			toast.success('Add cinema successful!', {
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
			<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<form
					className="flex flex-wrap items-center justify-between gap-x-4"
					onSubmit={handleSubmit(onAddCinema)}
				>
					<h2 className="text-3xl font-bold text-gray-900">Cinema Lists</h2>
					<div className="flex drop-shadow-md">
						<input className="rounded-l py-1 px-3" required {...register('name', { required: true })} />
						<button className="flex items-center rounded-r-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white hover:from-indigo-500 hover:to-blue-500">
							ADD +
						</button>
					</div>
				</form>
				<div className="flex flex-wrap items-center gap-3 pt-2">
					{cinemas?.map((cinema, index) => {
						return cinemas[selectedCinemaIndex]?.name === cinema.name ? (
							<button
								className="w-fit rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 px-2.5 py-1.5 text-lg font-medium text-white drop-shadow-xl hover:from-indigo-700 hover:to-blue-600"
								onClick={() => {
									setSelectedCinemaIndex(null)
									localStorage.setItem('selectedCinemaIndex', null)
								}}
								key={index}
							>
								{cinema.name}
							</button>
						) : (
							<button
								className="w-fit rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 px-2 py-1 font-medium text-white drop-shadow-md hover:from-indigo-700 hover:to-blue-600"
								onClick={() => {
									setSelectedCinemaIndex(index)
									localStorage.setItem('selectedCinemaIndex', index)
								}}
								key={index}
							>
								{cinema.name}
							</button>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default CinemaLists
