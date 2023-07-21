import { TrashIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'

const Movie = () => {
	const { auth } = useContext(AuthContext)
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm()

	const [movies, setMovies] = useState([])
	const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false)
	const [isAddingMovie, SetIsAddingMovie] = useState(false)

	const fetchMovies = async (data) => {
		try {
			setIsFetchingMoviesDone(false)
			const response = await axios.get('/movie')
			// console.log(response.data.data)
			reset()
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingMoviesDone(true)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const onAddMovie = async (data) => {
		try {
			SetIsAddingMovie(true)
			const response = await axios.post('/movie', data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
			fetchMovies()
			toast.success('Add movie successful!', {
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
			SetIsAddingMovie(false)
		}
	}

	const handleDelete = (movie) => {
		const confirmed = window.confirm(
			`Do you want to delete movie ${movie.name}, including its showtimes and tickets?`
		)
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
			// console.log(response.data)
			fetchMovies()
			toast.success('Delete movie successful!', {
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
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 sm:gap-8">
			<Navbar />
			<div className="mx-4 flex h-fit flex-col rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
				<h2 className="text-3xl font-bold text-gray-900">Movie Lists</h2>
				<form
					onSubmit={handleSubmit(onAddMovie)}
					className="mt-4 flex flex-col items-center justify-end gap-4 rounded-md bg-gradient-to-br from-indigo-100 to-white p-4 drop-shadow-md lg:flex-row"
				>
					<div className="flex w-full grow flex-col flex-wrap justify-start gap-4 lg:w-auto">
						<div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
							<label className="text-lg font-semibold leading-5">Name :</label>
							<input
								type="text"
								required
								className="w-full flex-grow rounded px-3 py-1 font-semibold drop-shadow-sm sm:w-auto"
								{...register('name', {
									required: true
								})}
							/>
						</div>
						<div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
							<label className="text-lg font-semibold leading-5">Length (min.):</label>
							<input
								type="number"
								min="1"
								max="2000"
								maxLength="3"
								required
								className="w-full flex-grow rounded px-3 py-1 font-semibold drop-shadow-sm sm:w-auto"
								{...register('length', {
									required: true
								})}
							/>
						</div>
						<div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
							<label className="text-lg font-semibold leading-5">Poster URL :</label>
							<input
								type="text"
								required
								className="w-full flex-grow rounded px-3 py-1 font-semibold drop-shadow-sm sm:w-auto"
								{...register('img', {
									required: true
								})}
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4 lg:w-auto lg:flex-row">
						{watch('img') && (
							<img src={watch('img')} className="h-32 rounded-md object-contain drop-shadow-md" />
						)}
						<button
							className="w-full min-w-fit items-center rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 px-2 py-1 text-center font-medium text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-500 disabled:from-slate-500 disabled:to-slate-400 lg:h-32 lg:w-20 xl:w-32 xl:text-xl"
							type="submit"
							disabled={isAddingMovie}
						>
							{isAddingMovie ? 'Processing...' : 'ADD +'}
						</button>
					</div>
				</form>
				{isFetchingMoviesDone ? (
					!!movies.length && (
						<div className="mt-6 grid grid-cols-1 gap-4 rounded-md bg-gradient-to-br from-indigo-100 to-white p-4 drop-shadow-md lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1920px]:grid-cols-5">
							{movies.map((movie, index) => {
								return (
									<div
										key={index}
										className="flex min-w-fit flex-grow rounded-md bg-white drop-shadow-md"
									>
										<img
											src={movie.img}
											className="h-36 rounded-md object-contain drop-shadow-md sm:h-48"
										/>
										<div className="flex flex-grow flex-col justify-between p-2">
											<div>
												<p className="text-lg font-semibold sm:text-xl">{movie.name}</p>
												<p>length : {movie.length || '-'} min.</p>
											</div>
											<button
												className="flex w-fit items-center gap-1 self-end rounded-md bg-gradient-to-br from-red-700 to-rose-700 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-700 hover:to-rose-600"
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
					)
				) : (
					<Loading />
				)}
			</div>
		</div>
	)
}

export default Movie
