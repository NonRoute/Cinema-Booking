import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Datepicker from 'tailwind-datepicker-react'

const DatePicker = ({ selectedDate, setSelectedDate }) => {
	const { auth } = useContext(AuthContext)
	const [isEditing, SetIsEditing] = useState(false)
	const [show, setShow] = useState(false)

	const handlePrevDay = () => {
		const prevDay = new Date(selectedDate)
		prevDay.setDate(prevDay.getDate() - 1)
		setSelectedDate(prevDay)
		sessionStorage.setItem('selectedDate', prevDay)
	}

	const handleNextDay = () => {
		const nextDay = new Date(selectedDate)
		nextDay.setDate(nextDay.getDate() + 1)
		setSelectedDate(nextDay)
		sessionStorage.setItem('selectedDate', nextDay)
	}

	const handleToday = () => {
		const today = new Date()
		setSelectedDate(today)
		sessionStorage.setItem('selectedDate', today)
	}

	const formatDate = (date) => {
		const weekday = date.toLocaleString('default', { weekday: 'long' })
		const day = date.getDate()
		const month = date.toLocaleString('default', { month: 'long' })
		const year = date.getFullYear()
		return `${weekday} ${day} ${month} ${year}`
	}

	const isPast = (date) => {
		return (
			date.getFullYear() <= new Date().getFullYear() &&
			date.getMonth() <= new Date().getMonth() &&
			date.getDate() <= new Date().getDate()
		)
	}

	const handleChange = (selectedDate) => {
		setSelectedDate(selectedDate)
	}
	const handleClose = (state) => {
		setShow(state)
		SetIsEditing(state)
	}

	const options = {
		title: '',
		autoHide: true,
		todayBtn: true,
		clearBtn: false,
		minDate: auth.role === 'admin' ? new Date('2000-01-01') : new Date().setDate(new Date().getDate() - 1),
		theme: {
			todayBtn:
				' text-cyan-300bg-gradient-to-br from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500',
			disabledText: 'dark:text-gray-500',
			input: 'bg-gradient-to-br from-indigo-800 to-blue-700',
			selected: 'bg-gradient-to-br from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-500'
		},
		defaultDate: new Date(selectedDate),
		language: 'en'
	}

	return (
		<div className="flex items-stretch justify-between gap-2 rounded-md bg-gradient-to-br from-indigo-800 to-blue-700 p-2 font-semibold text-white">
			{auth.role === 'admin' || !isPast(selectedDate) ? (
				<button
					title="Go to yesterday"
					className={'rounded hover:bg-gradient-to-br hover:from-indigo-600 hover:to-blue-600'}
					onClick={handlePrevDay}
				>
					<ChevronLeftIcon className="h-10 w-10 text-white" />
				</button>
			) : (
				<div className="h-10 w-10"></div>
			)}

			{isEditing ? (
				<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
			) : (
				<div
					className="flex w-full items-center justify-center rounded text-center text-xl hover:bg-gradient-to-br hover:from-indigo-600 hover:to-blue-600 sm:text-2xl"
					onClick={() => {
						SetIsEditing(true)
						setShow(true)
					}}
				>
					{formatDate(selectedDate)}
				</div>
			)}

			<div className="flex items-center justify-between gap-2">
				<button
					title="Go to tomorrow"
					className="rounded hover:bg-gradient-to-br hover:from-indigo-600 hover:to-blue-600"
					onClick={handleNextDay}
				>
					<ChevronRightIcon className="h-10 w-10 text-white" />
				</button>
				<button
					title="Go to today"
					className="rounded px-1 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-blue-600"
					onClick={handleToday}
				>
					<ArrowPathIcon className="h-10 w-10 text-white" />
				</button>
			</div>
		</div>
	)
}

export default DatePicker
