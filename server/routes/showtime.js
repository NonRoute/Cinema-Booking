const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const { addShowtime, getShowtime, bookSeats, deleteShowtime } = require('../controllers/showtimeController')

router.route('/').post(protect, authorize('admin'), addShowtime)
router.route('/:id').get(getShowtime).post(bookSeats).delete(protect, authorize('admin'), deleteShowtime)

module.exports = router
