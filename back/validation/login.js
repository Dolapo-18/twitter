const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
	const errors = [];
	errors.length = 0;

	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	const { email, password } = data;

	if (validator.isEmpty(email)) {
		errors.push("Email field is required");
	} else if (!validator.isEmail(email)) {
		errors.push("Email is invalid");
	}

	if (validator.isEmpty(password)) {
		errors.push("Password field is required");
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
