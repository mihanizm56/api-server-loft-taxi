module.exports = ({ timestamp, expiredAt }) =>
	parseInt(new Date(expiredAt).getTime() - new Date(timestamp).getTime());
