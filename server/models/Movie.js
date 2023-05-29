const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a movie name']
		},
		length: {
			type: Number,
			required: [true, 'Please add a movie length']
		},
		img: {
			type: String,
			required: [true, 'Please add a movie img']
		}
	},
	{ timestamps: true }
)

movieSchema.pre('remove', async function (next) {
	const movieId = this._id
	const showtimes = await this.model('Showtime').find({ movie: movieId })

	for (const showtime of showtimes) {
		await showtime.remove()
	}
	next()
})

module.exports = mongoose.model('Movie', movieSchema)
