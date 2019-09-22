const mongoose = require("mongoose");
require("./model.js");

const OrdersModel = mongoose.model("Orders");

// get
module.exports.getOrders = () => OrdersModel.find({});

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
