window.onscroll = function () {
	scrollFunction();
};

let navbar = document.getElementById("navbar");

function scrollFunction() {
	if (
		document.body.scrollTop > 200 ||
		document.documentElement.scrollTop > 200
	) {
		navbar.classList.add("coloredNav");
		navbar.classList.add("shadow");
	} else {
		navbar.classList.remove("coloredNav");
		navbar.classList.remove("shadow");
	}
}

const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const form = document.getElementById("searchBook");
cancelBtn.onclick = () => {
	searchBtn.classList.remove("hide");
	cancelBtn.classList.remove("show");
	form.classList.remove("active");
};
searchBtn.onclick = () => {
	form.classList.add("active");
	searchBtn.classList.add("hide");
	cancelBtn.classList.add("show");
};
