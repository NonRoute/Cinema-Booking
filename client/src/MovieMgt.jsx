import { useForm } from 'react-hook-form'
import Navbar from './components/Navbar'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { toast } from 'react-toastify'
import { TrashIcon } from '@heroicons/react/24/solid'

const MovieMgt = () => {
	const { auth } = useContext(AuthContext)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const [movies, setMovies] = useState([])

	const fetchMovies = async (data) => {
		try {
			const response = await axios.get('/movie')
			// console.log(response.data.data)
			reset()
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const onAddMovie = async (data) => {
		try {
			const response = await axios.post('/movie', data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			fetchMovies()
			toast.success('Add movie successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}

	const handleDelete = (movie) => {
		const confirmed = window.confirm(`Do you want to delete movie ${movie.name}?`)
		if (confirmed) {
			onDeleteMovie(movie._id)
		}
	}

	const onDeleteMovie = async (id) => {
		try {
			const response = await axios.delete(`/movie/${id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			console.log(response.data)
			fetchMovies()
			toast.success('Delete movie successful!')
		} catch (error) {
			console.error(error)
			toast.error('Error')
		}
	}
	return (
		<div className="flex flex-col sm:gap-8 bg-gradient-to-br from-indigo-900 to-blue-500 min-h-screen pb-8">
			<Navbar />
			<div className="flex flex-col bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-4 sm:mx-8 p-4 sm:p-6 rounded-md drop-shadow-xl">
				<h2 className="text-gray-900 font-bold text-3xl">Movie Lists</h2>
				<form
					onSubmit={handleSubmit(onAddMovie)}
					className="flex flex-col lg:flex-row gap-4 drop-shadow-md items-center justify-end bg-gradient-to-br from-indigo-100 to-white p-4 rounded-md mt-4"
				>
					<div className="flex flex-col w-full flex-wrap gap-4 justify-start">
						<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
							<label className="font-semibold text-lg leading-5">Name :</label>
							<input
								type="text"
								required
								className="flex-grow w-full sm:w-auto rounded py-1 px-3 font-semibold drop-shadow-sm"
								{...register('name', {
									required: true
								})}
							/>
						</div>
						<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
							<label className="font-semibold text-lg leading-5">Length (min.):</label>
							<input
								type="number"
								min="1"
								max="2000"
								maxLength="3"
								className="flex-grow w-full sm:w-auto rounded py-1 px-3 font-semibold drop-shadow-sm"
								{...register('length')}
							/>
						</div>
						<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
							<label className="font-semibold text-lg leading-5">Poster URL :</label>
							<input
								type="text"
								required
								className="flex-grow w-full sm:w-auto rounded py-1 px-3 font-semibold drop-shadow-sm"
								{...register('img', {
									required: true
								})}
							/>
						</div>
					</div>
					<button
						className="drop-shadow-md w-full lg:w-20 lg:h-32 text-centeritems-center text-white font-medium bg-gradient-to-br from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1"
						type="submit"
					>
						ADD +
					</button>
				</form>
				{!!movies.length && (
					<div className="flex gap-4 flex-wrap bg-gradient-to-br from-indigo-100 to-white p-4 drop-shadow-md rounded-md mt-6">
						{movies.map((movie, index) => {
							return (
								<div
									key={index}
									className="flex flex-grow min-w-fit bg-white drop-shadow-md rounded-md"
								>
									<img src={movie.img} className="h-48 drop-shadow-md rounded-md object-contain" />
									<div className="flex flex-grow flex-col justify-between p-2">
										<div>
											<h2 className="text-xl font-semibold">{movie.name}</h2>
											<h2 className="">length : {movie.length || '-'} min.</h2>
										</div>
										<button
											className="self-end flex gap-1 items-center text-white text-sm font-medium bg-gradient-to-br from-red-700 to-rose-700 hover:from-red-700 hover:to-rose-600 rounded-md pl-2 pr-1.5 py-1 w-fit"
											onClick={() => handleDelete(movie)}
										>
											DELETE
											<TrashIcon className="h-5 w-5" />
										</button>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default MovieMgt
