const mongoose = require("mongoose");

const userCredentialsSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	timestamp: {
		type: Date,
		required: true,
		unique: false,
	},
	from: {
		type: Number,
		required: true,
		unique: false,
	},
	to: {
		type: Number,
		required: true,
		unique: false,
	},
	isDone: {
		type: Boolean,
		required: true,
		unique: false,
	},
});

mongoose.model("Credentials", userCredentialsSchema, "Credentials");
