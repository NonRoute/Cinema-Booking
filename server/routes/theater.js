const express = require('express')
const {
	getTheaters,
	getTheater,
	createTheater,
	updateTheater,
	deleteTheater,
	getTheaterByMovie,
	getUnreleasedTheater,
	getUnreleasedTheaterByMovie
} = require('../controllers/theaterController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getTheaters).post(protect, authorize('admin'), createTheater)
router.route('/unreleased/:id').get(protect, authorize('admin'), getUnreleasedTheater)
router.route('/movie/unreleased/:mid/:date/:timezone').get(protect, authorize('admin'), getUnreleasedTheaterByMovie)
router.route('/movie/:mid/:date/:timezone').get(getTheaterByMovie)
router
	.route('/:id')
	.get(getTheater)
	.put(protect, authorize('admin'), updateTheater)
	.delete(protect, authorize('admin'), deleteTheater)

module.exports = router
