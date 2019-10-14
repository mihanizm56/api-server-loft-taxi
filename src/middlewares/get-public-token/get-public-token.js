const fetch = require("node-fetch");
const {
	ERROR_MESSAGES,
	STATUSES,
	MESSAGES,
} = require("../../constants/constants");
const { publicTokenUrl } = require("../../utils/variables");

module.exports = async (req, res, next) => {
	try {
		const publicKey = await fetch(publicTokenUrl)
			.then(data => data.json())
			.then(data => data.PUBLIC_KEY_ACCESS);
		console.log("get public token from auth server");

		global.JWT_PUBLIC_ACCESS = publicKey;
		next();
	} catch (error) {
		console.log("error in getter public token middleware", error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
