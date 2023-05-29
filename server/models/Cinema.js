const mongoose = require('mongoose')

const cinemaSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			required: [true, 'Please add a name']
		},
		theaters: [{ type: mongoose.Schema.ObjectId, ref: 'Theater' }]
	},
	{ timestamps: true }
)

cinemaSchema.pre('remove', async function (next) {
	// Remove theaters associated with the cinema being deleted
	const theaters = await this.model('Theater').find({ _id: { $in: this.theaters } })

	for (const theater of theaters) {
		await theater.remove()
	}
	next()
})

module.exports = mongoose.model('Cinema', cinemaSchema)
