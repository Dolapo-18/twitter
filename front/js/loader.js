const showLoader = element => {
	const div = document.createElement("div");
	const img = document.createElement("img");

	div.setAttribute("id", "loader");
	div.className = "text-center p-5";
	div.style.height = "100vh";

	img.setAttribute("src", "./img/loader.gif");

	div.appendChild(img);

	element.style.display = "none";
	element.parentElement.insertBefore(div, element);
};

const hideLoader = element => {
	document.querySelector("#loader").remove();

	element.style.display = "block";
};
