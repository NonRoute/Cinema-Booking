import { useForm } from 'react-hook-form'
import Navbar from './components/Navbar'

const MovieMgt = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	return (
		<div className="flex flex-col sm:gap-8 bg-gradient-to-br from-indigo-900 to-blue-500 min-h-screen pb-8">
			<Navbar />
			<div className="flex flex-col bg-gradient-to-br from-indigo-200 to-blue-100 h-fit mx-4 sm:mx-8 p-4 sm:p-6 rounded-md drop-shadow-xl">
				<h2 className="text-gray-900 font-bold text-3xl">Movie Lists</h2>
				<div className="flex flex-col lg:flex-row gap-4 drop-shadow-md items-center justify-end bg-gradient-to-br from-indigo-100 to-white p-4 rounded-md mt-4">
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
							<label className="font-semibold text-lg leading-5">Length :</label>
							<input
								type="number"
								min="1"
								max="500"
								maxLength="3"
								required
								className="flex-grow w-full sm:w-auto rounded py-1 px-3 font-semibold drop-shadow-sm"
								{...register('length', {
									required: true
								})}
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
						className="drop-shadow-md w-full lg:w-20 lg:h-32 text-centeritems-center text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500 rounded-md px-2 py-1"
						type="submit"
					>
						ADD +
					</button>
				</div>
				<div className="flex gap-4 flex-wrap bg-gradient-to-br from-indigo-100 to-white p-4 drop-shadow-md rounded-md mt-6">
					<div className="flex flex-grow min-w-fit bg-white drop-shadow-md rounded-md">
						<img
							src="https://cdn.shopify.com/s/files/1/1057/4964/products/Avengers-Endgame-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1670821335"
							className="w-32 drop-shadow-md rounded-md"
						/>
						<div className="p-2">
							<h2>Movie name</h2>
							<h2>length : 180 min</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MovieMgt
