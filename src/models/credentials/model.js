const mongoose = require("mongoose");

const userCredentialsSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	credentials: {
		card_user: {
			type: String,
			required: true,
			unique: true,
		},
		exp_date: {
			type: String,
			required: true,
			unique: false,
		},
		card_number: {
			type: Number,
			required: true,
			unique: true,
		},
		cvv: {
			type: Number,
			required: true,
			unique: false,
		},
	},
});

mongoose.model("Credentials", userCredentialsSchema, "Credentials");
