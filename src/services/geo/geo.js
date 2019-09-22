const HereMapsAPI = require("here-maps-node");
const get = require("lodash/get");
const dotenv = require("dotenv");
const { MESSAGES } = require("../../constants/constants");

dotenv.config();

const HERE_MAPS_AP_ID = process.env.HERE_MAPS_AP_ID;
const HERE_MAPS_AP_CODE = process.env.HERE_MAPS_AP_CODE;

const config = {
	app_id: HERE_MAPS_AP_ID,
	app_code: HERE_MAPS_AP_CODE,
};

const hmAPI = new HereMapsAPI.default(config);

module.exports = async searchtext =>
	new Promise((resolve, reject) => {
		hmAPI.geocode({ searchtext }, (error, result) => {
			if (error) reject(error);
			if (!Boolean(result)) reject();

			const coordsResult = get(
				result,
				"Response.View[0].Result[0].Location.NavigationPosition[0]",
				null
			);

			if (!coordsResult) reject({ message: MESSAGES.MESSAGE_NOT_FOUND });

			resolve(coordsResult);
		});
	});
