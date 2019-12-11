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
		name: inputs[0].value,
		email: inputs[1].value,
		password: inputs[2].value,
		password2: inputs[3].value
	};

	axios
		.post("http://localhost:5000/api/users/register", newUser)
		.then(res => {
			createResponse(res.data.msg, "bg-success");
			setTimeout(
				() =>
					(window.location.href =
						window.location.origin + "/login.html"),
				10000
			);
		})
		.catch(e => e.response.data.forEach(msg => createResponse(msg)))
		.finally(() => hideLoader(form));
};

form.addEventListener("submit", submit);

async () => {
	const [todos, users, albums, posts] = await Promise.all([
		axios.get("https://jsonplaceholder.typicode.com/todos"),
		axios.get("https://jsonplaceholder.typicode.com/users"),
		axios.get("https://jsonplaceholder.typicode.com/albums"),
		axios.get("https://jsonplaceholder.typicode.com/posts")
	]);

	console.log(todos.data);
	console.log(albums.data);
	console.log(posts.data);
	console.table(users.data);
};
