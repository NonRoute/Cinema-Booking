const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const { addShowtime, getShowtime } = require('../controllers/showtimeController')

router.route('/').post(protect, authorize('admin'), addShowtime)
router.route('/:id').get(getShowtime)

module.exports = router
