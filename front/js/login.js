const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");

const submit = event => {
	event.preventDefault();
	showLoader(form);
	const errors = [];

	inputs.forEach(input => {
		const err = validation(input);
		errors.push(...err);
	});

	if (errors.length > 0) {
		errors.forEach(error => createResponse(error));
		setTimeout(() => hideLoader(form), 5000);
		return;
	}

	const newUser = {
		email: inputs[0].value,
		password: inputs[1].value
	};

	const headers = {
		"Content-Type": "application/json"
	};

	axios
		.post("http://localhost:5000/api/users/signin", newUser, { headers })
		.then(res => {
			createResponse(res.data.msg, "bg-success");
			saveToken(res.data.token);
			setTimeout(
				() =>
					(window.location.href =
						window.location.origin + "/dashboard.html"),
				10000
			);
		})
		.catch(e => e.response.data.forEach(msg => createResponse(msg)))
		.finally(() => hideLoader(form));
};

form.addEventListener("submit", submit);
