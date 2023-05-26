const mongoose = require('mongoose')

const showtimeSchema = new mongoose.Schema({
	movie: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
	showtime: Date,
	seats: { type: mongoose.Schema.ObjectId, ref: 'Seats' }
})

showtimeSchema.pre('remove', async function (next) {
	await this.model('Seats').deleteMany({ _id: this.seats })
	next()
})

module.exports = mongoose.model('Showtime', showtimeSchema)
