const mongoose = require('mongoose')

const cinemaSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Please add a name']
	},
	theaters: [{ type: mongoose.Schema.ObjectId, ref: 'Theater' }]
})

cinemaSchema.pre('remove', async function (next) {
	// Remove theaters associated with the cinema being deleted
	await this.model('Theater').deleteMany({ _id: { $in: this.theaters } });
	next();
  });
  

module.exports = mongoose.model('Cinema', cinemaSchema)
