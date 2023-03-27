const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
	row: { type: String, required: [true, 'Please add a seat row'] },
	number: { type: Number, required: [true, 'Please add a seat number'] },
	status: { type: Boolean, required: [true, 'Please add a seat status'] },
	user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Seat', seatSchema)
