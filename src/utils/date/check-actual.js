module.exports = expiredDate =>
	Boolean(parseInt(new Date(expiredDate).getTime() - new Date().getTime()) > 0);
