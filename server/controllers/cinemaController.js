const Cinema = require('../models/Cinema')

//@desc     GET all cinemas
//@route    GET /cinema
//@access   Public
exports.getCinemas = async (req, res, next) => {
	try {
		const cinemas = await Cinema.find()
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.collation({ locale: 'en', strength: 2 })
			.sort({ name: 1 })
			.then((cinemas) => {
				cinemas.forEach((cinema) => {
					cinema.theaters.forEach((theater) => {
						theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
					})
				})
				return cinemas
			})

		res.status(200).json({ success: true, count: cinemas.length, data: cinemas })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET all cinemas with all unreleased showtime
//@route    GET /cinema/unreleased
//@access   Private admin
exports.getUnreleasedCinemas = async (req, res, next) => {
	try {
		const cinemas = await Cinema.find()
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.collation({ locale: 'en', strength: 2 })
			.sort({ name: 1 })

		res.status(200).json({ success: true, count: cinemas.length, data: cinemas })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single cinema
//@route    GET /cinema/:id
//@access   Public
exports.getCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findById(req.params.id)
			.populate({
				path: 'theaters',
				populate: {
					path: 'showtimes',
					populate: { path: 'movie', select: 'name length' },
					select: 'movie showtime isRelease'
				},
				select: 'number seatPlan showtimes'
			})
			.then((cinemas) => {
				cinemas.forEach((cinema) => {
					cinema.theaters.forEach((theater) => {
						theater.showtimes = theater.showtimes.filter((showtime) => showtime.isRelease)
					})
				})
				return cinemas
			})

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Create cinema
//@route    POST /cinema
//@access   Private
exports.createCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.create(req.body)
		res.status(201).json({
			success: true,
			data: cinema
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Update cinemas
//@route    PUT /cinema/:id
//@access   Private Admin
exports.updateCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete single cinema
//@route    DELETE /cinema/:id
//@access   Private Admin
exports.deleteCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findById(req.params.id)

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${req.params.id}` })
		}

		await cinema.deleteOne()

		res.status(200).json({ success: true })
	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: err })
	}
}
