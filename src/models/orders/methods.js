const mongoose = require("mongoose");
require("./model.js");

const OrdersModel = mongoose.model("Orders");

const ORDERS_IN_PAGE = 20;

// get orders with pagination
module.exports.getOrdersFromDB = async ({ page }) => {
	const { docs } = await OrdersModel.paginate(
		{},
		{ page, limit: ORDERS_IN_PAGE }
	);

	const totalElements = await OrdersModel.count();

	return { paginatedOrders: docs, totalElements };
};

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
