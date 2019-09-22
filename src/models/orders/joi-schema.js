import Joi from "@hapi/joi";

const orderSchema = Joi.object().keys({
	username: Joi.string()
		.min(1)
		.max(40)
		.required(),
	timestamp: Joi.date()
		.format("YYYY-MM-DD")
		.utc()
		.required(),
	from: Joi.number().required(),
	to: Joi.number().required(),
	isDone: Joi.boolean().required(),
});

export default orderSchema;
