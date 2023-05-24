import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cinema = ({ cinemas, selectedCinemaIndex, setSelectedCinemaIndex, fetchCinemas, auth }) => {
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
			console.log(response.data)
			reset()
			fetchCinemas()
			toast.success('Add cinema successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	return (
		<>
			<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-8 p-6 rounded-md drop-shadow-xl">
				<form
					className="flex flex-wrap gap-x-4 items-center justify-between"
					onSubmit={handleSubmit(onAddCinema)}
				>
					<h2 className="text-gray-900 font-bold text-3xl">Cinema</h2>
					<div className="flex drop-shadow-md">
						<input className="rounded-l py-1 px-3" required {...register('name', { required: true })} />
						<button className="flex items-center text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-r-md px-2 py-1">
							ADD +
						</button>
					</div>
				</form>
				<div className="flex flex-wrap items-center gap-3 pt-2">
					{cinemas?.map((cinema, index) => {
						return cinemas[selectedCinemaIndex]?.name === cinema.name ? (
							<button
								className="bg-gradient-to-br from-indigo-800 to-blue-700 hover:from-indigo-700 hover:to-blue-600 rounded-md drop-shadow-xl w-fit px-2.5 py-1.5 text-white font-medium text-lg"
								onClick={() => setSelectedCinemaIndex(null)}
								key={index}
							>
								{cinema.name}
							</button>
						) : (
							<button
								className="bg-gradient-to-br from-indigo-800 to-blue-700 hover:from-indigo-700 hover:to-blue-600 rounded-md drop-shadow-md w-fit px-2 py-1 text-white font-medium"
								onClick={() => setSelectedCinemaIndex(index)}
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

export default Cinema
