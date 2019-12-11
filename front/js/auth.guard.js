(() => {
	const token = getToken();
	const { pathname, href, origin } = window.location;
	if (!token) {
		return (href = `${origin}/login.html`);
	}
	const headers = {
		Authorization: `Bearer ${token}`
	};

	axios
		.get("http://localhost:5000/api/users/current", { headers })
		.then(res => {
			if (
				pathname === "/signup.html" ||
				pathname === "/login.html" ||
				pathname === "/"
			) {
				return (href = `${origin}/dashboard.html`);
			}
		})
		.catch(e => {
			if (
				pathname !== "/signup.html" ||
				pathname !== "/login.html" ||
				pathname !== "/"
			) {
				return (href = `${origin}/login.html`);
			}
		});
})();
