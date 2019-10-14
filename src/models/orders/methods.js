const mongoose = require("mongoose");
require("./model.js");

const OrdersModel = mongoose.model("Orders");

// get last order
module.exports.getLastOrderFromDB = () =>
	OrdersModel.findOne()
		.sort({ date: -1 })
		.limit(1);

// add
module.exports.addOrderInDb = orderData => {
	const newOrder = new OrdersModel(orderData);
	return newOrder;
};

// update
module.exports.updateOrderFromDb = ({ id, orderData }) =>
	OrdersModel.findByIdAndUpdate(id, orderData, {
		overwrite: false,
	});
