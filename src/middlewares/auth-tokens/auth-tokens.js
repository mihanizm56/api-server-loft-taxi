const { verifyAccessToken } = require("../../utils/tokens/tokens");
const {
	ERROR_MESSAGES,
	STATUSES,
	MESSAGES,
} = require("../../constants/constants");

module.exports = async (req, res, next) => {
	try {
		const token = req.body.token;
		console.log("get token");
		const userNameFromToken = await verifyAccessToken(token);
		console.log("userNameFromToken", userNameFromToken);
		res.locals.username = userNameFromToken;
		next();
	} catch (error) {
		console.log("error in verifying access token", error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
