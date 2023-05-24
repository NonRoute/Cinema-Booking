import { useEffect, useState } from 'react'
import Movie from './Movie'
import axios from 'axios'
import { ArrowsUpDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid'

const Theater = ({ theater, number }) => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<h3 className="bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-t-2xl w-fit px-8 py-0.5">
					{number}
				</h3>
				<div className="flex items-center gap-6 bg-gradient-to-br from-indigo-800 to-blue-700 text-white font-bold text-lg rounded-t-2xl w-fit px-4 py-0.5">
					<div className="flex gap-2 items-center">
						<ArrowsUpDownIcon className="h-6 w-6" />
						{theater.seatPlan.row === 'A' ? <h4>Row : A</h4> : <h4>Row : A - {theater.seatPlan.row}</h4>}
					</div>
					<div className="flex gap-2 items-center">
						<ArrowsRightLeftIcon className="h-6 w-6" />
						{theater.seatPlan.column === 1 ? (
							<h4>Column : 1</h4>
						) : (
							<h4>Column : 1 - {theater.seatPlan.column}</h4>
						)}
					</div>
				</div>
			</div>
			<div className="bg-gradient-to-br from-indigo-100 to-white rounded-b-md flex flex-col gap-4 py-4">
				<Movie />
				<Movie />
			</div>
		</div>
	)
}
export default Theater
