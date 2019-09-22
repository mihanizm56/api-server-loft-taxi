const mongoose = require("mongoose");
require("./model.js");

const OrdesModel = mongoose.model("Users");

// get
module.exports.getOrders = () => OrdesModel.find({});

// add
module.exports.addOrderInDb = orderData => {
	const newOrder = new OrdesModel(orderData);
	return newOrder;
};

// update
module.exports.updateOrderFromDb = ({ id, userData }) =>
	OrdesModel.findByIdUpdate({ id }, userData, {
		overwrite: false,
	});
