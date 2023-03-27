const express = require('express')
const { getCinemas, getCinema, createCinema, updateCinema, deleteCinema } = require('../controllers/cinemaController')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getCinemas).post(protect, authorize('admin'), createCinema)
router
	.route('/:id')
	.get(getCinema)
	.put(protect, authorize('admin'), updateCinema)
	.delete(protect, authorize('admin'), deleteCinema)

module.exports = router
