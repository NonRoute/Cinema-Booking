const Cinema = require('../models/Cinema')

//@desc     GET all cinemas
//@route    GET /cinemas
//@access   Public
exports.getCinemas = async (req, res, next) => {
	try {
		const cinemas = await Cinema.find()
		res.status(200).json({ success: true, count: cinemas.length, data: cinemas })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     GET single cinema
//@route    GET /cinemas/:id
//@access   Public
exports.getCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findById(req.params.id)

		if (!cinema) {
			return res.status(400).json({ success: false })
		}

		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     Create all cinemas
//@route    POST /cinemas
//@access   Private
exports.createCinema = async (req, res, next) => {
	const cinema = await Cinema.create(req.body)
	res.status(201).json({
		success: true,
		data: cinema
	})
}

//@desc     Update cinemas
//@route    PUT /cinemas/:id
//@access   Private
exports.updateCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!cinema) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true, data: cinema })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     Delete all cinemas
//@route    DELETE /cinemas/:id
//@access   Private
exports.deleteCinema = async (req, res, next) => {
	try {
		const cinema = await Cinema.findByIdAndDelete(req.params.id)

		if (!cinema) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true, data: {} })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}
