const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const { addShowtime, getShowtime, bookSeats } = require('../controllers/showtimeController')

router.route('/').post(protect, authorize('admin'), addShowtime)
router.route('/:id').get(getShowtime).post(bookSeats)

module.exports = router
