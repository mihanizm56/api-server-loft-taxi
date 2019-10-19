// DELTA_TIME_IN_S - время сдвига от начала заказа
const dotenv = require("dotenv");
dotenv.config();

const DELTA_TIME_IN_MS = parseInt(process.env.DELTA_TIME_IN_MS);

// хелпер для получения expiredAt
module.exports = timestamp =>
	new Date(parseInt(new Date(timestamp).getTime() + DELTA_TIME_IN_MS));
