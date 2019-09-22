const sanitize = require("mongo-sanitize");
const {
	STATUSES,
	MESSAGES,
	ERROR_MESSAGES,
} = require("../../constants/constants");
const geoSearch = require("../../services/geo/geo");
const {
	addOrderInDb,
	updateOrderFromDb,
} = require("../../models/orders/methods");
const ordersSchema = require("../../models/orders/joi-schema");

const TIMER_FOR_NEXT_ORDER = process.env.TIMER_FOR_NEXT_ORDER;

module.exports.addOrder = async (req, res) => {
	const username = sanitize(res.locals.username);
	const from = sanitize(req.body.from);
	const to = sanitize(req.body.to);
	const timestamp = new Date();
	const isDone = false;
	const orderData = { username, from, to, timestamp, isDone };
	console.log("initial order data", orderData);

	try {
		const orderCoordsFrom = await geoSearch(from);
		const orderCoordsTo = await geoSearch(to);
		console.log("orderCoordsFrom", orderCoordsFrom);
		console.log("orderCoordsTo", orderCoordsTo);

		try {
			await ordersSchema.validateAsync(orderData);
		} catch (error) {
			console.log("error in validating order data", error);

			return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.NOT_CORRECT_DATA,
			});
		}

		try {
			const { _id: order_id } = await addOrderInDb(orderData).save();

			return res.status(STATUSES.STATUS_SUCCESS).json({
				message: MESSAGES.MESSAGE_SUCCESS,
				error: "",
				coords: [orderCoordsFrom, orderCoordsTo],
				exp_time: TIMER_FOR_NEXT_ORDER,
				order_id,
			});
		} catch (error) {
			console.log(error);

			return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
			});
		}
	} catch (error) {
		console.log("error when get coords", error);

		return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.NOT_FOUND,
		});
	}
};

module.exports.updateOrder = async (req, res) => {
	const orderId = sanitize(req.body.orderId);
	const isDone = true;

	try {
		await updateOrderFromDb({ id: orderId, orderData: { isDone } });
	} catch (error) {
		console.log("error when upd order data", error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}

	return res
		.status(STATUSES.STATUS_SUCCESS)
		.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
};
