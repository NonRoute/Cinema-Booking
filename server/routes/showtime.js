const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const { addShowtime, getShowtime, deleteShowtime, purchase } = require('../controllers/showtimeController')

router.route('/').post(protect, authorize('admin'), addShowtime)
router
	.route('/:id')
	.get(getShowtime)
	.post(protect, authorize('user', 'admin'), purchase)
	.delete(protect, authorize('admin'), deleteShowtime)

module.exports = router
