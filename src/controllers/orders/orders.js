const { STATUSES, MESSAGES } = require("../../constants/constants");

module.exports.addOrder = (req, res) => {
	console.log("test addOrder");

	return res
		.status(STATUSES.STATUS_SUCCESS)
		.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
};
