const Movie = require('../models/Movie')

//@desc     GET all movies
//@route    GET /movie
//@access   Public
exports.getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find()
		res.status(200).json({ success: true, count: movies.length, data: movies })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     GET single movie
//@route    GET /movie/:id
//@access   Public
exports.getMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findById(req.params.id)

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: movie })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Create movie
//@route    POST /movie
//@access   Private
exports.createMovie = async (req, res, next) => {
	try {
		const movie = await Movie.create(req.body)
		res.status(201).json({
			success: true,
			data: movie
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Update movies
//@route    PUT /movie/:id
//@access   Private Admin
exports.updateMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: movie })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//@desc     Delete all movies
//@route    DELETE /movie/:id
//@access   Private Admin
exports.deleteMovie = async (req, res, next) => {
	try {
		const movie = await Movie.findByIdAndDelete(req.params.id)

		if (!movie) {
			return res.status(400).json({ success: false, message: `Movie not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
