const storageKey = "bookshelf_data";
const submitAction = document.getElementById("inputBook");
let bookData = getBookList();

function checkForStorage() {
	return typeof Storage !== "undefined";
}

function getBookList() {
	return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function renderBookList(bookData) {
	const incompleteList = document.querySelector("#incompleteBookshelfList");
	const completedList = document.querySelector("#completeBookshelfList");

	incompleteList.innerHTML = "";
	completedList.innerHTML = "";

	for (let book of bookData) {
		const article = document.createElement("article");
		const bookTitle = document.createElement("div");
		const title = document.createElement("h2");
		const author = document.createElement("p");
		const year = document.createElement("p");

		article.classList.add("book_item", "shadow");
		bookTitle.classList.add("book_title");
		title.innerHTML = book.title;
		author.innerHTML = `Penulis : ${book.author}`;
		year.innerHTML = `Tahun : ${book.year}`;

		article.appendChild(bookTitle);
		bookTitle.appendChild(title);
		bookTitle.appendChild(author);
		bookTitle.appendChild(year);

		const action = document.createElement("div");
		const trash = document.createElement("button");
		action.classList.add("action");
		trash.classList.add("red");
		trash.setAttribute("id", String(book.id));
		trash.addEventListener("click", removeBookList);
		if (book.isCompleted) {
			const undo = document.createElement("button");
			undo.classList.add("undo");
			undo.setAttribute("id", String(book.id));
			undo.addEventListener("click", completeOrUndo);
			action.appendChild(undo);
			action.appendChild(trash);
			article.appendChild(action);
			completedList.appendChild(article);
		} else {
			const complete = document.createElement("button");
			complete.classList.add("green");
			complete.setAttribute("id", String(book.id));
			complete.addEventListener("click", completeOrUndo);
			action.appendChild(complete);
			action.appendChild(trash);
			article.appendChild(action);
			incompleteList.appendChild(article);
		}
	}
}

function removeBookList(e) {
	const idButton = Number(e.target.attributes.getNamedItem("id").value);
	const modal = document.getElementById("myModal");
	const closeBtn = document.getElementsByClassName("closeBTN")[0];

	modal.style.display = "block";
	closeBtn.onclick = function () {
		modal.style.display = "none";
	};

	for (let i = 0; i < bookData.length; i++) {
		if (bookData[i].id === idButton) {
			bookData.splice(i, 1);
		}
	}
	const newData = JSON.stringify(bookData);
	localStorage.setItem(storageKey, newData);
	renderBookList(bookData);
}

function completeOrUndo(e) {
	const idButton = Number(e.target.attributes.getNamedItem("id").value);
	for (let i = 0; i < bookData.length; i++) {
		if (bookData[i].id === idButton) {
			bookData[i].isCompleted = !bookData[i].isCompleted;
		}
	}
	const newData = JSON.stringify(bookData);
	localStorage.setItem(storageKey, newData);
	renderBookList(bookData);
}

function resetInput() {
	const titleInput = document.getElementById("inputBookTitle"),
		authorInput = document.getElementById("inputBookAuthor"),
		yearInput = document.getElementById("inputBookYear"),
		completeCheck = document.getElementById("inputBookIsComplete");
		titleInput.value = "";
		authorInput.value = "";
		yearInput.value = "";
		completeCheck.checked = false;
}

window.addEventListener("load", function () {
	let bookData = getBookList();
	let searchFormInput = document.getElementById("searchBookTitle");
	let searchForm = document.getElementById("searchBook");
	if (checkForStorage()) {
		console.log("This Browser Support Web Storage");
		searchFormInput.addEventListener("keyup", bookSearch);
		searchForm.addEventListener("submit", bookSearch);
		renderBookList(bookData);
	} else {
		alert(
			"Browser Yang Anda Gunakan Tidak Mendukung Web Storage. Mohon Gunakan Browser Lain"
		);
	}
});

submitAction.addEventListener("submit", function (e) {
	e.preventDefault();
	const titleInput = document.getElementById("inputBookTitle"),
		authorInput = document.getElementById("inputBookAuthor"),
		yearInput = document.getElementById("inputBookYear"),
		completeCheck = document.getElementById("inputBookIsComplete"),
		newBookData = {
			id: +new Date(),
			title: titleInput.value,
			author: authorInput.value,
			year: yearInput.value,
			isCompleted: completeCheck.checked,
		};
	bookData.push(newBookData);
	localStorage.setItem(storageKey, JSON.stringify(bookData));
	renderBookList(bookData);
	resetInput();
});
