const sanitize = require("mongo-sanitize");
const {
	STATUSES,
	MESSAGES,
	ERROR_MESSAGES,
} = require("../../constants/constants");
const {
	addUserCredsInDb,
	updateUserCredsFromDb,
	getUserCredsFromDbByUserName,
} = require("../../models/credentials/methods");
const credentialsSchema = require("../../models/credentials/joi-schema");

module.exports.getCreds = async (req, res) => {
	try {
		const usernameFromToken = sanitize(res.locals.username);
		console.log("test getCreds", usernameFromToken);
		const {
			credentials: { card_user, exp_date, card_number, cvv },
		} = await getUserCredsFromDbByUserName(usernameFromToken);

		if (card_user && exp_date && card_number && cvv) {
			return res.status(STATUSES.STATUS_SUCCESS).json({
				message: MESSAGES.MESSAGE_SUCCESS,
				error: "",
			});
		} else {
			return res.status(STATUSES.STATUS_SUCCESS).json({
				message: MESSAGES.MESSAGE_SUCCESS,
				error: "not full data",
			});
		}
	} catch (error) {
		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
module.exports.updCreds = async (req, res) => {
	try {
		const body = req.body;
		const username = sanitize(res.locals.username);

		const card_user = sanitize(body.card_user);
		const exp_date = sanitize(body.exp_date);
		const card_number = sanitize(body.card_number);
		const cvv = sanitize(body.cvv);
		const newUserCreds = {
			username,
			credentials: { card_user, exp_date, card_number, cvv },
		};

		console.log("test updCreds user", res.locals.username);
		console.log("creds body req", body);

		try {
			await credentialsSchema.validateAsync(newUserCreds);
		} catch (error) {
			console.log("error in validating user creds", error);

			return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.NOT_CORRECT_DATA,
			});
		}

		try {
			await updateUserCredsFromDb({ username, newUserCreds });

			return res
				.status(STATUSES.STATUS_SUCCESS)
				.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
		} catch (error) {
			console.log("error in adding user in db", error);

			return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.NOT_CORRECT_DATA,
			});
		}

		return res
			.status(STATUSES.STATUS_SUCCESS)
			.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
	} catch (error) {
		console.log(error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
module.exports.addCreds = async (req, res) => {
	try {
		const body = req.body;
		const username = sanitize(res.locals.username);

		const card_user = sanitize(body.card_user);
		const exp_date = sanitize(body.exp_date);
		const card_number = sanitize(body.card_number);
		const cvv = sanitize(body.cvv);
		const userCreds = {
			username,
			credentials: { card_user, exp_date, card_number, cvv },
		};

		try {
			await credentialsSchema.validateAsync(userCreds);
		} catch (error) {
			console.log("error in validating user creds", error);

			return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.NOT_CORRECT_DATA,
			});
		}
		try {
			await addUserCredsInDb(userCreds).save();

			console.log("test addCreds user", res.locals.username);
			console.log("creds body req", body);

			return res
				.status(STATUSES.STATUS_SUCCESS)
				.json({ message: MESSAGES.MESSAGE_SUCCESS, error: "" });
		} catch (error) {
			console.log("error in adding user in db", error);

			return res.status(STATUSES.STATUS_NOT_CORRECT_DATA).json({
				message: MESSAGES.MESSAGE_ERROR,
				error: ERROR_MESSAGES.NOT_CORRECT_DATA,
			});
		}
	} catch (error) {
		console.log(error);

		return res.status(STATUSES.STATUS_INTERNAL_SERVER_ERROR).json({
			message: MESSAGES.MESSAGE_ERROR,
			error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
