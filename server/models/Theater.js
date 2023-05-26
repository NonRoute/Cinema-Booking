const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
	seatPlan: {
		row: {
			type: String,
			maxlength: 2,
			required: [true, 'Please add a seatPlan row']
		},
		column: {
			type: Number,
			required: [true, 'Please add a seatPlan column']
		}
	},
	showtimes: [
		{
			movie: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
			showtime: Date,
			seats: { type: mongoose.Schema.ObjectId, ref: 'Seats' }
		}
	]
})

module.exports = mongoose.model('Theater', theaterSchema)
