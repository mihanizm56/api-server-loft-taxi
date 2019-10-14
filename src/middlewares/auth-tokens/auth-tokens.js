const {
	verifyAccessToken,
	getTokenFromHeaders,
} = require("../../utils/tokens/tokens");
const {
	ERROR_MESSAGES,
	STATUSES,
	MESSAGES,
} = require("../../constants/constants");

module.exports = async (req, res, next) => {
	try {
		const token = getTokenFromHeaders(req.headers.authorization);
		console.log("get token from headers", token);
		const userNameFromToken = await verifyAccessToken(token);
		console.log("userNameFromToken", userNameFromToken);
		res.locals.username = userNameFromToken;
		next();
	} catch (error) {
		console.log("error in verifying access token", error);

		if (Boolean(error.expired)) {
			return res.status(STATUSES.STATUS_UNAUTHORIZED).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.EXPIRED,
			});
		}

		return res.status(STATUSES.STATUS_UNAUTHORIZED).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.UNAUTHORIZED,
		});
	}
};
