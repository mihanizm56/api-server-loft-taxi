const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
	username: Joi.string()
		.min(1)
		.max(40)
		.required(),
	credentials: {
		card_user: Joi.string()
			.min(1)
			.max(40)
			.required(),
		exp_date: Joi.string().required(),
		card_number: Joi.number().required(),
		cvv: Joi.number().required(),
	},
});
