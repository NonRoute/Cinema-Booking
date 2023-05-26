const Cinema = require('../models/Cinema')
const Movie = require('../models/Movie')
const Seats = require('../models/Seats')
const Showtime = require('../models/Showtime')
const Theater = require('../models/Theater')

//@desc     GET single showtime
//@route    GET /theater/showtime/:id
//@access   Public
exports.getShowtime = async (req, res, next) => {
	try {
		const { theater: theaterId } = req.body

		const theater = await Theater.findById(theaterId)

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${theaterId}` })
		}

		const showtime = theater.showtimes.find((element) => element._id.toString() === req.params.id)

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
//@route    POST /theater/showtime
//@access   Private
exports.addShowtime = async (req, res, next) => {
	try {
		const { movie: movieId, showtime, theater: theaterId } = req.body

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

		const seatsDoc = await Seats.create({ seats })
		const showtimeDoc = await Showtime.create({ movie: movie._id, showtime, seats: seatsDoc._id })

		theater.showtimes.push(showtimeDoc._id)

		await theater.save()

		res.status(200).json({
			success: true,
			data: theater
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
