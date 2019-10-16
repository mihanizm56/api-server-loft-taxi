const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: false,
	},
	timestamp: {
		type: Date,
		required: true,
		unique: false,
	},
	fromText: {
		type: String,
		required: true,
		unique: false,
	},
	toText: {
		type: String,
		required: true,
		unique: false,
	},
	from: {
		type: String,
		required: true,
		unique: false,
	},
	to: {
		type: String,
		required: true,
		unique: false,
	},
	orderCoordsFrom: {
		Latitude: { type: Number, required: true, unique: false },
		Longitude: { type: Number, required: true, unique: false },
	},
	orderCoordsTo: {
		Latitude: { type: Number, required: true, unique: false },
		Longitude: { type: Number, required: true, unique: false },
	},
	isDone: {
		type: Boolean,
		required: true,
		unique: false,
	},
	expiredAt: {
		type: Date,
		required: true,
		unique: false,
	},
});

mongoose.model("Orders", ordersSchema, "Orders");
