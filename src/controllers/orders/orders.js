const sanitize = require("mongo-sanitize");
const {
	STATUSES,
	MESSAGES,
	ERROR_MESSAGES,
} = require("../../constants/constants");
const getDeltaTime = require("../../utils/date/delta");
const getTimeCount = require("../../utils/date/counter");
const geoSearch = require("../../services/geo/geo");
const {
	addOrderInDb,
	doneOrderFromDb,
	getLastOrderFromDB,
} = require("../../models/orders/methods");
const ordersSchema = require("../../models/orders/joi-schema");

module.exports.addOrder = async (req, res) => {
	const username = sanitize(res.locals.username);
	const fromText = sanitize(req.body.from);
	const toText = sanitize(req.body.to);
	const timestamp = sanitize(req.body.timestamp);
	const expiredAt = getDeltaTime(timestamp);
	const isDone = false;

	try {
		const orderCoordsFrom = await geoSearch(fromText);
		const orderCoordsTo = await geoSearch(toText);
		const timeCounter = getTimeCount({ timestamp, expiredAt });

		const orderData = {
			username,
			fromText,
			toText,
			timestamp,
			isDone,
			expiredAt,
			orderCoordsFrom,
			orderCoordsTo,
		};
		console.log("orderData", orderData);
		console.log("orderCoordsFrom", orderCoordsFrom);
		console.log("orderCoordsTo", orderCoordsTo);
		console.log("fromText", fromText);
		console.log("toText", toText);

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
			const {
				_id: order_id,
				orderCoordsTo,
				orderCoordsFrom,
			} = await addOrderInDb(orderData).save();

			return res.status(STATUSES.STATUS_SUCCESS).json({
				message: MESSAGES.MESSAGE_SUCCESS,
				error: "",
				order: {
					order_id,
					is_done: false,
					from_coords: orderCoordsFrom,
					to_coords: orderCoordsTo,
					from_text: fromText,
					to_text: toText,
					exp_time: timeCounter,
				},
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

module.exports.doneOrder = async (req, res) => {
	const orderId = sanitize(req.body.orderId);
	const isDone = true;

	try {
		await doneOrderFromDb({ id: orderId, orderData: { isDone } });
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

module.exports.getLastOrder = async (req, res) => {
	try {
		const lastOrder = await getLastOrderFromDB();
		if (lastOrder) {
			const {
				_id: order_id,
				isDone: is_done,
				orderCoordsFrom: from_coords,
				orderCoordsTo: to_coords,
				fromText: from_text,
				toText: to_text,
			} = lastOrder;
			console.log("lastOrder", lastOrder);
			const timeCounter = getTimeCount({
				timestamp: lastOrder.timestamp,
				expiredAt: lastOrder.expiredAt,
			});

			const orderData = {
				order_id,
				is_done,
				from_coords,
				to_coords,
				from_text,
				to_text,
				exp_time: timeCounter,
			};

			return res.status(STATUSES.STATUS_SUCCESS).json({
				message: MESSAGES.MESSAGE_SUCCESS,
				error: "",
				order: orderData,
			});
		}

		return res
			.status(STATUSES.STATUS_SUCCESS)
			.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "", order: null });
	} catch (error) {
		console.log("error when get the last order data", error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
