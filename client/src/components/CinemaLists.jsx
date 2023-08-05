import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './Loading'
const CinemaLists = ({
	cinemas,
	selectedCinemaIndex,
	setSelectedCinemaIndex,
	fetchCinemas,
	auth,
	isFetchingCinemas = false
}) => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm()

	const [isAdding, SetIsAdding] = useState(false)

	const onAddCinema = async (data) => {
		try {
			SetIsAdding(true)
			const response = await axios.post('/cinema', data, {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			// console.log(response.data)
			reset()
			fetchCinemas(data.name)
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
		} finally {
			SetIsAdding(false)
		}
	}

	const CinemaLists = ({ cinemas }) => {
		const cinemasList = cinemas?.filter((cinema) =>
			cinema.name.toLowerCase().includes(watch('search')?.toLowerCase() || '')
		)

		return cinemasList.length ? (
			cinemasList.map((cinema, index) => {
				return cinemas[selectedCinemaIndex]?._id === cinema._id ? (
					<button
						className="w-fit rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 px-2.5 py-1.5 text-lg font-medium text-white drop-shadow-xl hover:from-indigo-700 hover:to-blue-600"
						onClick={() => {
							setSelectedCinemaIndex(null)
							sessionStorage.setItem('selectedCinemaIndex', null)
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
							sessionStorage.setItem('selectedCinemaIndex', index)
						}}
						key={index}
					>
						{cinema.name}
					</button>
				)
			})
		) : (
			<div>No cinemas found</div>
		)
	}

	return (
		<>
			<div className="mx-4 flex h-fit flex-col gap-4 rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 text-gray-900 drop-shadow-xl sm:mx-8 sm:p-6">
				<form
					className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
					onSubmit={handleSubmit(onAddCinema)}
				>
					<h2 className="text-3xl font-bold">Cinema Lists</h2>
					{auth.role === 'admin' && (
						<div className="flex w-fit grow sm:justify-end">
							<input
								placeholder="Type a cinema name"
								className="w-full grow rounded-l border border-gray-300 px-3 py-1 sm:max-w-xs"
								required
								{...register('name', { required: true })}
							/>
							<button
								disabled={isAdding}
								className="flex items-center whitespace-nowrap rounded-r-md bg-gradient-to-r from-indigo-600 to-blue-500 px-2 py-1 font-medium text-white hover:from-indigo-500 hover:to-blue-400 disabled:from-slate-500 disabled:to-slate-400"
							>
								{isAdding ? 'Processing...' : 'ADD +'}
							</button>
						</div>
					)}
				</form>
				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<MagnifyingGlassIcon className="h-5 w-5 stroke-2 text-gray-500" />
					</div>
					<input
						type="search"
						className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-gray-900"
						placeholder="Search cinema"
						{...register('search')}
					/>
				</div>
				{isFetchingCinemas ? (
					<Loading />
				) : (
					<div className="flex flex-wrap items-center gap-3">
						<CinemaLists cinemas={cinemas} />
					</div>
				)}
			</div>
		</>
	)
}

export default CinemaLists
