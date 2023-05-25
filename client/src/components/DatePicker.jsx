import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const DatePicker = ({ selectedDate, setSelectedDate }) => {
	const handlePrevDay = () => {
		const prevDay = new Date(selectedDate)
		prevDay.setDate(prevDay.getDate() - 1)
		setSelectedDate(prevDay)
	}

	const handleNextDay = () => {
		const nextDay = new Date(selectedDate)
		nextDay.setDate(nextDay.getDate() + 1)
		setSelectedDate(nextDay)
	}

	const formatDate = (date) => {
		const weekday = date.toLocaleString('default', { weekday: 'long' })
		const day = date.getDate()
		const month = date.toLocaleString('default', { month: 'long' })
		const year = date.getFullYear()
		return `${weekday} ${day} ${month} ${year}`
	}

	return (
		<div className="flex gap-2 justify-between items-center font-semibold  text-white">
			<button className="" onClick={handlePrevDay}>
				<ChevronLeftIcon className="w-10 h-10 text-white" />
			</button>
			<h2 className="text-xl sm:text-2xl text-center">{formatDate(selectedDate)}</h2>
			<button className="arrow" onClick={handleNextDay}>
				<ChevronRightIcon className="w-10 h-10 text-white" />
			</button>
		</div>
	)
}

export default DatePicker
