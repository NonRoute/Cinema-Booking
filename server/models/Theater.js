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
	showtimes: [{ type: mongoose.Schema.ObjectId, ref: 'Showtime' }]
})

theaterSchema.pre('remove', async function (next) {
	const showtimes = await this.model('Showtime').find({ _id: { $in: this.showtimes } })

	for (const showtime of showtimes) {
		await showtime.remove()
	}
	next()
})

module.exports = mongoose.model('Theater', theaterSchema)
