const Seats = require('../models/Seats')

//@desc     GET single seats
//@route    GET /cinema/:id
//@access   Public
exports.getSeats = async (req, res, next) => {
	try {
		const seats = await Seats.findById(req.params.id)

		if (!seats) {
			return res.status(400).json({ success: false, message: `Seats not found with id of ${req.params.id}` })
		}

		res.status(200).json({ success: true, data: seats })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
