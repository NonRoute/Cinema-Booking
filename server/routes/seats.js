const express = require('express')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const { getSeats } = require('../controllers/seatsController')

router.route('/:id').get(getSeats)

module.exports = router
