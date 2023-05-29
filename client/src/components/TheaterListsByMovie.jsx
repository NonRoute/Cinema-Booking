import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TrashIcon, ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import Theater from './Theater'
import { useEffect, useState } from 'react'
import DatePicker from './DatePicker'

const TheaterListsByMovie = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth }) => {
	const [selectedDate, setSelectedDate] = useState(new Date())

	return (
		<div className="mx-4 h-fit rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 drop-shadow-md sm:mx-8">
			<div className="flex flex-col gap-6 p-4 sm:p-6">
				<div className="rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 p-2">
					<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
				</div>
				{/* {cinemas[selectedCinemaIndex].theaters.map((theater, index) => {
					return <Theater key={index} theaterId={theater} movies={movies} selectedDate={selectedDate} />
				})} */}
			</div>
		</div>
	)
}

export default TheaterListsByMovie
