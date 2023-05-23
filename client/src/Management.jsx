import Navbar from './components/Navbar'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect, useState } from 'react'

const Management = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const [cinemas, setCinemas] = useState([])
	const [selectedCinema, setSelectedCinema] = useState(null)

	const onAddCinema = async (data) => {
		try {
			const response = await axios.post('/cinema', data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			reset()
			fetchCinema()
			toast.success('Add cinema successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	const fetchCinema = async (data) => {
		try {
			const response = await axios.get('/cinema')
			console.log(response.data.data)
			setCinemas(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCinema()
	}, [])

	const CinemaComponent = () => {
		return (
			<>
				<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit m-8 p-6 rounded-md drop-shadow-xl">
					<form
						className="flex flex-wrap gap-x-4 items-center justify-between"
						onSubmit={handleSubmit(onAddCinema)}
					>
						<h2 className="text-gray-900 font-bold text-3xl">Cinema</h2>
						<div className="flex drop-shadow-md">
							<input className="rounded-l py-1 px-3" {...register('name')} />
							<button className="flex items-center text-white text-md font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-r-md px-2 py-1">
								Add +
							</button>
						</div>
					</form>
					<div className="flex flex-wrap items-center gap-3 pt-2">
						{cinemas.map((cinema) => {
							return selectedCinema === cinema.name ? (
								<button
									className="bg-gradient-to-br from-indigo-800 to-blue-700 hover:from-indigo-700 hover:to-blue-600 rounded-md drop-shadow-xl w-fit px-2.5 py-1.5 text-white font-medium text-lg"
									onClick={() => setSelectedCinema(cinema.name)}
								>
									{cinema.name}
								</button>
							) : (
								<button
									className="bg-gradient-to-br from-indigo-800 to-blue-700 hover:from-indigo-700 hover:to-blue-600 rounded-md drop-shadow-md w-fit px-2 py-1 text-white font-medium"
									onClick={() => setSelectedCinema(cinema.name)}
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
	return (
		<div className="bg-gradient-to-br from-indigo-900 to-blue-500 h-screen">
			<Navbar />
			<CinemaComponent />
		</div>
	)
}

export default Management
