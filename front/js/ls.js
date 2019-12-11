const getToken = () => {
	return window.localStorage.getItem("login");
};

const saveToken = token => {
	window.localStorage.setItem("login", token);
};

const logout = () => {
	window.localStorage.setItem("login", undefined);
	window.location.href = `${window.location.origin}/login.html`;
};
