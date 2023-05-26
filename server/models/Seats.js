const mongoose = require('mongoose')

const seatsSchema = new mongoose.Schema({
	seats: [
		{
			row: { type: String, required: [true, 'Please add a seat row'] },
			number: { type: Number, required: [true, 'Please add a seat number'] },
			status: { type: Number, required: [true, 'Please add a seat status'] },
			user: { type: mongoose.Schema.ObjectId, ref: 'User' }
		}
	]
})

module.exports = mongoose.model('Seats', seatsSchema)
