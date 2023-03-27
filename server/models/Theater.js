const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: [true, 'Please add a theater number']
	},
	movies: [
		{
			movie: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
			showtimes: [Date]
		}
	],
	seatPlan: {
		row: {
			type: Number,
			required: [true, 'Please add a seatPlan row']
		},
		number: {
			type: Number,
			required: [true, 'Please add a seatPlan number']
		}
	},
	seats: [{ type: mongoose.Schema.ObjectId, ref: 'Seat' }]
})

module.exports = mongoose.model('Theater', theaterSchema)
