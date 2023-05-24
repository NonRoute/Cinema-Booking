const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
	movies: [
		{
			movie: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
			showtimes: [Date]
		}
	],
	seatPlan: {
		row: {
			type: String,
			maxlength: 1,
			required: [true, 'Please add a seatPlan row']
		},
		column: {
			type: Number,
			required: [true, 'Please add a seatPlan column']
		}
	},
	seats: [
		{
			row: { type: String, required: [true, 'Please add a seat row'] },
			number: { type: Number, required: [true, 'Please add a seat number'] },
			status: { type: Number, required: [true, 'Please add a seat status'] },
			user: { type: mongoose.Schema.ObjectId, ref: 'User' }
		}
	]
})

module.exports = mongoose.model('Theater', theaterSchema)
