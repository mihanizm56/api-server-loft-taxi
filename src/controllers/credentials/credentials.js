const { STATUSES, MESSAGES } = require("../../constants/constants");

module.exports.getCreds = (req, res) => {
	console.log("test getCreds");

	return res
		.status(STATUSES.STATUS_SUCCESS)
		.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
};
module.exports.updCreds = (req, res) => {
	console.log("test updCreds");

	return res
		.status(STATUSES.STATUS_SUCCESS)
		.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
};
module.exports.addCreds = (req, res) => {
	console.log("test addCreds");

	return res
		.status(STATUSES.STATUS_SUCCESS)
		.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
};
