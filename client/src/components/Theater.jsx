import { useEffect, useState } from 'react'
import Movie from './Movie'
import axios from 'axios'

const Theater = ({ theater }) => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<h3 className="bg-gradient-to-br from-gray-800 to-gray-700 text-white font-bold text-2xl rounded-t-2xl w-fit px-8 py-0.5">
					{theater.number}
				</h3>
				<div className="flex items-center gap-6 bg-gradient-to-br from-indigo-800 to-blue-700 text-white font-bold text-lg rounded-t-2xl w-fit px-4 py-0.5">
					<div className="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
							/>
						</svg>
						{theater.seatPlan.row === 'A' ? <h4>Row : A</h4> : <h4>Row : A - {theater.seatPlan.row}</h4>}
					</div>
					<div className="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
							/>
						</svg>
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
