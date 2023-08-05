const Cinema = require('../models/Cinema')
const Theater = require('../models/Theater')

//@desc     GET all theaters
//@route    GET /theater
//@access   Public
exports.getTheaters = async (req, res, next) => {
	try {
		const theaters = await Theater.find()
			.populate([
				{ path: 'showtimes', select: 'movie showtime isRelease' },
				{ path: 'cinema', select: 'name' }
			])
			.then((theaters) => {
				theaters.forEach((theater) => {
					theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
				})
				return theaters
			})

		res.status(200).json({ success: true, count: theaters.length, data: theaters })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single theater
//@route    GET /theater/:id
//@access   Public
exports.getTheater = async (req, res, next) => {
	try {
		const theater = await Theater.findById(req.params.id)
			.populate([
				{ path: 'showtimes', select: 'movie showtime isRelease' },
				{ path: 'cinema', select: 'name' }
			])
			.then((theater) => {
				theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
				return theater
			})

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: theater })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single theater with all unreleased showtime
//@route    GET /theater/unreleased/:id
//@access   Private admin
exports.getUnreleasedTheater = async (req, res, next) => {
	try {
		const theater = await Theater.findById(req.params.id).populate([
			{ path: 'showtimes', select: 'movie showtime isRelease' },
			{ path: 'cinema', select: 'name' }
		])

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: theater })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET theaters by movie and date
//@route    GET /theater/movie/:mid/:date/:timezone
//@access   Public
exports.getTheaterByMovie = async (req, res, next) => {
	try {
		const { mid, date, timezone } = req.params
		let theaters = await Theater.find()
			.populate([
				{
					path: 'showtimes',
					populate: { path: 'movie', select: 'name _id' },
					select: 'movie showtime isRelease'
				},
				{ path: 'cinema', select: 'name' }
			])
			.then((theaters) => {
				theaters.forEach((theater) => {
					theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
				})
				return theaters
			})

		theaters = theaters.filter((theater) => {
			return theater.showtimes.some((showtime) => {
				const d1 = new Date(showtime.showtime)
				const d2 = new Date(date)
				d1.setTime(d1.getTime() - timezone * 60 * 1000)
				d2.setTime(d2.getTime() - timezone * 60 * 1000)
				return (
					showtime.movie._id.equals(mid) &&
					d1.getUTCFullYear() === d2.getUTCFullYear() &&
					d1.getUTCMonth() === d2.getUTCMonth() &&
					d1.getUTCDate() === d2.getUTCDate()
				)
			})
		})
		res.status(200).json({ success: true, data: theaters })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET theaters by movie and date with all unreleased showtime
//@route    GET /theater/movie/unreleased/:mid/:date/:timezone
//@access   Private admin
exports.getUnreleasedTheaterByMovie = async (req, res, next) => {
	try {
		const { mid, date, timezone } = req.params
		let theaters = await Theater.find().populate([
			{
				path: 'showtimes',
				populate: { path: 'movie', select: 'name _id' },
				select: 'movie showtime isRelease'
			},
			{ path: 'cinema', select: 'name' }
		])

		theaters = theaters.filter((theater) => {
			return theater.showtimes.some((showtime) => {
				const d1 = new Date(showtime.showtime)
				const d2 = new Date(date)
				d1.setTime(d1.getTime() - timezone * 60 * 1000)
				d2.setTime(d2.getTime() - timezone * 60 * 1000)
				return (
					showtime.movie._id.equals(mid) &&
					d1.getUTCFullYear() === d2.getUTCFullYear() &&
					d1.getUTCMonth() === d2.getUTCMonth() &&
					d1.getUTCDate() === d2.getUTCDate()
				)
			})
		})
		res.status(200).json({ success: true, data: theaters })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Create theater
//@route    POST /theater
//@access   Private
exports.createTheater = async (req, res, next) => {
	try {
		const { cinema: cinemaId, row, column } = req.body
		const rowRegex = /^([A-D][A-Z]|[A-Z])$/
		if (!rowRegex.test(row)) {
			return res.status(400).json({ success: false, message: `Row is not a valid letter between A to CZ` })
		}

		if (column < 1 || column > 120) {
			return res.status(400).json({ success: false, message: `Column is not a valid number between 1 to 250` })
		}

		const cinema = await Cinema.findById(cinemaId)

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${cinemaId}` })
		}

		const theater = await Theater.create({ cinema, number: cinema.theaters.length + 1, seatPlan: { row, column } })

		cinema.theaters.push(theater._id)

		await cinema.save()

		res.status(201).json({
			success: true,
			data: theater
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Update theaters
//@route    PUT /theater/:id
//@access   Private Admin
exports.updateTheater = async (req, res, next) => {
	try {
		const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: theater })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete single theaters
//@route    DELETE /theater/:id
//@access   Private Admin
exports.deleteTheater = async (req, res, next) => {
	try {
		const theater = await Theater.findById(req.params.id)

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}

		await theater.deleteOne()

		await Cinema.updateMany({ theaters: theater._id }, { $pull: { theaters: theater._id } })

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
