module.exports = ({ timestamp, expiredAt }) =>
	Math.round(
		parseInt(new Date(expiredAt).getTime() - new Date(timestamp).getTime()) /
			1000
	);
