import Joi from "@hapi/joi";

const credentialsSchema = Joi.object().keys({
	username: Joi.string()
		.min(1)
		.max(40)
		.required(),
	credentials: {
		card_user: Joi.string().required(),
		exp_date: Joi.string().required(),
		card_number: Joi.number().required(),
		cvv: Joi.string().required(),
	},
});

export default credentialsSchema;
