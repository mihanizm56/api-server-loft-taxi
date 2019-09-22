const mongoose = require("mongoose");
require("./model.js");

const CredentialsModel = mongoose.model("Credentials");

// get
module.exports.getUserCredsFromDbByUserName = username =>
	CredentialsModel.findOne({ username });

// add
module.exports.addUserCredsInDb = userData => {
	const newUserCreds = new CredentialsModel(userData);
	return newUserCreds;
};

// update
module.exports.updateUserCredsFromDb = ({ username, newUserCreds }) =>
	CredentialsModel.findOneAndUpdate({ username }, newUserCreds, {
		overwrite: true,
	});

// delete
module.exports.deleteUserCredsByUsername = ({ username }) =>
	CredentialsModel.deleteOne({ username });
