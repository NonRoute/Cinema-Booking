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
				<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-8 p-6 rounded-md drop-shadow-xl">
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
									onClick={() => setSelectedCinema(null)}
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

	const MovieComponent = () => {
		return (
			<div className="flex items-start">
				<img
					src="https://cdn.shopify.com/s/files/1/1057/4964/products/Avengers-Endgame-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1670821335"
					className="w-32 px-4 drop-shadow-md"
				/>
				<div className="flex flex-col py-4 gap-2">
					<div className="">
						<h4 className='text-2xl font-semibold'>Movie name</h4>
						<p className='text-md font-medium'>length : 320 min</p>
					</div>
					<div className="flex items-center gap-2 pt-1">
						<div className="bg-gradient-to-br from-gray-600 to-gray-500 rounded-md drop-shadow-sm text-white px-2 py-1 text-lg">
							10:00
						</div>
						<div className="bg-gradient-to-br from-gray-600 to-gray-500 rounded-md drop-shadow-sm text-white px-2 py-1 text-lg">
							15:00
						</div>
					</div>
				</div>
			</div>
		)
	}

	const TheaterComponent = () => {
		return (
			<>
				<div className="bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-8 rounded-md">
					<div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-md text-white text-center py-1.5 text-2xl font-semibold">
						{selectedCinema}
					</div>
					<div className="p-6 drop-shadow-xl">
						<form
							className="flex flex-wrap gap-x-4 items-center justify-between"
							onSubmit={handleSubmit(onAddCinema)}
						>
							<h2 className="text-gray-900 font-bold text-3xl">Theater</h2>
							<div className="flex drop-shadow-md">
								<button className="flex items-center text-white text-md font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1">
									Add +
								</button>
							</div>
						</form>
						<div className="pt-2 ">
							<h3 className="bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-t-2xl w-fit px-8 py-0.5">
								1
							</h3>
							<div className="bg-gradient-to-br from-indigo-100 to-white rounded-b-md rounded-tr-md flex flex-col gap-4 py-4">
								<MovieComponent />
								<MovieComponent />
								<MovieComponent />
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
	return (
		<div className="flex flex-col gap-8 bg-gradient-to-br from-indigo-900 to-blue-500 min-h-screen pb-8">
			<Navbar />
			<CinemaComponent />
			{selectedCinema && <TheaterComponent />}
		</div>
	)
}

export default Management
