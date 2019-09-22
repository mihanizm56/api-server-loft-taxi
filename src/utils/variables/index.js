const dotenv = require("dotenv");
let dbURL;
let publicTokenUrl;
dotenv.config();

module.exports.port = process.env.SERVER_PORT || 8080;

switch (process.env.NODE_ENV) {
	case "development":
		dbURL = process.env.DB_URI_DEVELOPMENT;
		publicTokenUrl = process.env.PUBLIC_URL_DEV;
		break;
	case "production":
		dbURL = process.env.DB_URI_PRODUCTION;
		publicTokenUrl = process.env.PUBLIC_URL_PROD;
		break;

	default:
		dbURL = process.env.DB_URI_DEVELOPMENT;
		break;
}

module.exports.dbURL = dbURL;
module.exports.publicTokenUrl = publicTokenUrl;
