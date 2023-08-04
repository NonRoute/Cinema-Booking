const express = require('express')
const {
	getTheaters,
	getTheater,
	createTheater,
	updateTheater,
	deleteTheater,
	getTheaterByMovie,
	getUnreleaseTheater,
	getUnreleaseTheaterByMovie
} = require('../controllers/theaterController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getTheaters).post(protect, authorize('admin'), createTheater)
router.route('/unrelease/:id').get(protect, authorize('admin'), getUnreleaseTheater)
router.route('/movie/unrelease/:mid/:date/:timezone').get(protect, authorize('admin'), getUnreleaseTheaterByMovie)
router.route('/movie/:mid/:date/:timezone').get(getTheaterByMovie)
router
	.route('/:id')
	.get(getTheater)
	.put(protect, authorize('admin'), updateTheater)
	.delete(protect, authorize('admin'), deleteTheater)

module.exports = router
