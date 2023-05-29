const express = require('express')
const {
	getMovies,
	getMovie,
	createMovie,
	updateMovie,
	deleteMovie,
	getShowingMovies
} = require('../controllers/movieController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getMovies).post(protect, authorize('admin'), createMovie)
router.route('/showing').get(getShowingMovies)
router
	.route('/:id')
	.get(getMovie)
	.put(protect, authorize('admin'), updateMovie)
	.delete(protect, authorize('admin'), deleteMovie)

module.exports = router
