const validation = input => {
	const errors = [];
	if (input.value.length === 0) {
		errors.push(`${input.placeholder} is empty`);
	}

	if (input.type === "email") {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (input.value && !re.test(input.value)) {
			errors.push(`${input.placeholder} is invalid`);
		}
	}

	return errors;
};
