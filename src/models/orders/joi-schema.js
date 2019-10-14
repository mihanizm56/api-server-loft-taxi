const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
	username: Joi.string()
		.min(1)
		.max(40)
		.required(),
	timestamp: Joi.date()
		.iso()
		.required(),
	expiredAt: Joi.date()
		.iso()
		.required(),
	from: Joi.string().required(),
	to: Joi.string().required(),
	isDone: Joi.boolean().required(),
	orderCoordsFrom: {
		Latitude: Joi.number().required(),
		Longitude: Joi.number().required(),
	},
	orderCoordsTo: {
		Latitude: Joi.number().required(),
		Longitude: Joi.number().required(),
	},
});
