const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a movie name']
	},
	length: {
		type: Number
	},
	img: {
		type: String
	}
})

module.exports = mongoose.model('Movie', movieSchema)
