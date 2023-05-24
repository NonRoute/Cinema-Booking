import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Movie from './Movie'

const Theater = ({ cinemas, selectedCinema, setSelectedCinema, fetchCinema, auth }) => {
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
			setSelectedCinema({})
			fetchCinema()
			toast.success('Delete cinema successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	return (
		<>
			<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-8 rounded-md">
				<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-md text-white text-center py-1.5 px-2 text-2xl font-semibold">
					<div className="flex justify-center items-center">
						<span className="flex-grow">{selectedCinema?.name}</span>
						<button
							className="flex gap-1 items-center text-white text-sm font-medium bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-700 hover:to-rose-600 rounded-md pl-2 pr-1.5 py-1 w-fit"
							onClick={() => handleDelete(selectedCinema)}
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
				<div className="p-6 drop-shadow-xl">
					<form className="flex flex-wrap gap-x-4 items-center justify-between">
						<h2 className="text-gray-900 font-bold text-3xl">Theater</h2>
						<div className="flex gap-4 drop-shadow-md">
							<button className="flex items-center text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1">
								INCREASE +
							</button>
							<button className="flex items-center text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1">
								DECREASE -
							</button>
						</div>
					</form>
					{selectedCinema.theaters.map((theater, index) => {
						return (
							<div className="pt-2 ">
								<h3 className="bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-t-2xl w-fit px-8 py-0.5">
									{index + 1}
								</h3>
								<div className="bg-gradient-to-br from-indigo-100 to-white rounded-b-md rounded-tr-md flex flex-col gap-4 py-4">
									<Movie />
									<Movie />
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Theater
