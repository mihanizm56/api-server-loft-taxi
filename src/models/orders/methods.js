const mongoose = require("mongoose");
require("./model.js");

const OrdersModel = mongoose.model("Orders");

// get last order
module.exports.getLastOrderFromDB = username =>
	OrdersModel.findOne({ username }).sort({ timestamp: -1 });

// add
module.exports.addOrderInDb = orderData => {
	const newOrder = new OrdersModel(orderData);
	return newOrder;
};

// update
module.exports.doneOrderFromDb = ({ id, orderData }) =>
	OrdersModel.findByIdAndUpdate(id, orderData, {
		overwrite: false,
	});
