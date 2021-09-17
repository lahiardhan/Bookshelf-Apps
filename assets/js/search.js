function bookSearch(e) {
	e.preventDefault();
	const dataBook = getBookList();
	const searchInput = document.getElementById("searchBookTitle").value;
	let searchData = [];
	for(let i = 0; i < dataBook.length; i++) {
		let dataBookFound = dataBook[i].title.toLowerCase();
		if(dataBookFound.includes(searchInput.toLowerCase())) {
			searchData.push(dataBook[i]);
		}
	}
	renderBookList(searchData)
}