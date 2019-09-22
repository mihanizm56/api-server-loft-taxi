const jwt = require("jsonwebtoken");

module.exports.verifyAccessToken = token =>
	new Promise((resolve, reject) => {
		const JWT_PUBLIC_ACCESS = global.JWT_PUBLIC_ACCESS;

		try {
			jwt.verify(
				token,
				JWT_PUBLIC_ACCESS,
				{ algorithms: ["RS256"] },
				(error, decoded) => {
					if (
						Boolean(error) &&
						error.message &&
						error.message === "jwt expired"
					) {
						console.log("JWT EXPIRED");
						return reject({ expired: true });
					}

					if (error) {
						console.log("error in decoding token", error);
						return reject();
					}

					if (!decoded.username) {
						console.log("no decode");
						return reject();
					}

					return resolve(decoded.username);
				}
			);
		} catch (error) {
			return reject();
		}
	});
