const Movie = require('../models/Movie')
const Showtime = require('../models/Showtime')
const Theater = require('../models/Theater')
const User = require('../models/User')

//@desc     GET single showtime
//@route    GET /showtime/:id
//@access   Public
exports.getShowtime = async (req, res, next) => {
	try {
		const showtime = await Showtime.findById(req.params.id)
			.populate([
				'movie',
				{ path: 'theater', populate: { path: 'cinema', select: 'name' }, select: 'number cinema seatPlan' }
			])
			.select('-seats.user')

		if (!showtime) {
			return res.status(400).json({ success: false, message: `Showtime not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: showtime })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Add Showtime
//@route    POST /showtime
//@access   Private
exports.addShowtime = async (req, res, next) => {
	try {
		const { movie: movieId, showtime: showtimeString, theater: theaterId, repeat = 1 } = req.body

		let showtime = new Date(showtimeString)
		let showtimes = []
		let showtimeIds = []

		const theater = await Theater.findById(theaterId)

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}

		const movie = await Movie.findById(movieId)

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${movieId}` })
		}

		const row = theater.seatPlan.row
		const column = theater.seatPlan.column

		let seats = []
		for (let k = 64; k <= (row.length === 2 ? row.charCodeAt(0) : 64); k++) {
			for (
				let i = 65;
				i <= (k === row.charCodeAt(0) || row.length === 1 ? row.charCodeAt(row.length - 1) : 90);
				i++
			) {
				const letter = k === 64 ? String.fromCharCode(i) : String.fromCharCode(k) + String.fromCharCode(i)
				for (let j = 1; j <= column; j++) {
					const seat = { row: letter, number: j, status: 1 }
					seats.push(seat)
				}
			}
		}

		for (let i = 0; i < repeat; i++) {
			console.log(i)

			const showtimeDoc = await Showtime.create({ theater, movie: movie._id, showtime, seats })

			showtimeIds.push(showtimeDoc._id)
			showtimes.push(new Date(showtime))
			showtime.setDate(showtime.getDate() + 1)
		}

		console.log(showtimeIds)

		theater.showtimes = theater.showtimes.concat(showtimeIds)

		console.log(theater.showtimes)

		await theater.save()

		res.status(200).json({
			success: true,
			showtimes: showtimes
		})
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Purchase seats
//@route    POST /showtime/:id
//@access   Private
exports.purchase = async (req, res, next) => {
	try {
		const { seats } = req.body
		const user = req.user

		const showtime = await Showtime.findById(req.params.id)

		if (!showtime) {
			return res.status(400).json({ success: false, message: `Showtime not found with id of ${req.params.id}` })
		}

		const seatUpdates = seats.map((seatNumber) => {
			const [row, number] = seatNumber.match(/([A-Za-z]+)(\d+)/).slice(1)
			return { row, number: parseInt(number, 10) }
		})

		showtime.seats.forEach((seat) => {
			const matchingUpdate = seatUpdates.find(
				(update) => update.row === seat.row && update.number === seat.number
			)
			if (matchingUpdate) {
				seat.status = 2
				seat.user = user._id
			}
		})

		const updatedShowtime = await showtime.save()

		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{
				$push: { tickets: { showtime, seats: seatUpdates } }
			},
			{ new: true }
		)

		res.status(200).json({ success: true, data: updatedShowtime, updatedUser })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete single showtime
//@route    DELETE /showtime/:id
//@access   Private Admin
exports.deleteShowtime = async (req, res, next) => {
	try {
		const showtime = await Showtime.findById(req.params.id)

		if (!showtime) {
			return res.status(400).json({ success: false, message: `Showtime not found with id of ${req.params.id}` })
		}

		await showtime.remove()

		res.status(200).json({ success: true })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete previous day showtime
//@route    DELETE /showtime/previous
//@access   Private Admin
exports.deletePreviousShowtime = async (req, res, next) => {
	try {
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0)

		const showtimes = await Showtime.find({ showtime: { $lt: currentDate } })

		for (const showtime of showtimes) {
			await showtime.remove()
		}

		res.status(200).json({ success: true, count: showtimes.length })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}
