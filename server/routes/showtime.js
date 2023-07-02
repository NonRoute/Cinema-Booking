const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const {
	addShowtime,
	getShowtime,
	deleteShowtime,
	purchase,
	deletePreviousShowtime,
	getShowtimes,
	deleteShowtimes
} = require('../controllers/showtimeController')

router.route('/').get(getShowtimes).post(protect, authorize('admin'), addShowtime).delete(protect, authorize('admin'), deleteShowtimes)
router.route('/previous').delete(protect, authorize('admin'), deletePreviousShowtime)
router.route('/:id').get(getShowtime).post(protect, purchase).delete(protect, authorize('admin'), deleteShowtime)

module.exports = router
