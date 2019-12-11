const createResponse = (msg, className = "bg-danger") => {
	const div = document.createElement("div");
	div.className = "text-white text-center my-1 p-1 " + className;
	div.appendChild(document.createTextNode(msg));
	form.parentElement.insertBefore(div, form);
};

const hideResponse = () => {
	const divs = document.querySelectorAll(".text-white.text-center.my-1.p-1");

	let time = 5000;

	for (const div of divs) {
		setTimeout(() => div.remove(), time);
		time += 5000;
	}
};
