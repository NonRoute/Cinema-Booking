const Cinema = require('../models/Cinema')
const Theater = require('../models/Theater')

//@desc     GET all theaters
//@route    GET /theater
//@access   Public
exports.getTheaters = async (req, res, next) => {
	try {
		const theaters = await Theater.find()
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

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: theater })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Create theater
//@route    POST /theater
//@access   Private
exports.createTheater = async (req, res, next) => {
	try {
		const { cinema: cinemaId, number, row, column } = req.body
		const cinema = await Cinema.findById(cinemaId)

		if (!cinema) {
			return res.status(400).json({ success: false, message: `Cinema not found with id of ${cinemaId}` })
		}

		const theater = await Theater.create({ number, seatPlan: { row, column } })

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

//@desc     Delete all theaters
//@route    DELETE /theater/:id
//@access   Private Admin
exports.deleteTheater = async (req, res, next) => {
	try {
		const theater = await Theater.findByIdAndDelete(req.params.id)

		if (!theater) {
			return res.status(400).json({ success: false, message: `Theater not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
