const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
	initTime: {
		type: Date
	},

	finishTime: {
		type: Date
	},

	score: {
		type: Number,
		default: 0
	},

	game: {
		type: String
	},

	gameType: {
		type: String
	}
});

const pacientSchema = new Schema({
	// El username del user es el numero de expediente.
	birthday: {
		type: Date
	},

	scores: {
		type: [scoreSchema],
		default: []
	}
});

var userSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},

	firstLastName: {
		type: String,
		default: '',
		trim: true
	},

	secondLastName: {
		type: String,
		default: '',
		trim: true
	},

	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	pacient: {
		type: pacientSchema,
		default: null
	},

	password: {
		type: String,
		required: true
	},

	role: {
		type: String,
		default: 'ROLE_USER'
	},

	created: {
		type: Date,
		default: Date.now
	}
});

var User = mongoose.model('User', userSchema);
module.exports = User