const button = document.getElementById("searchBtn");
const output = document.getElementById("output");

button.addEventListener("click", () => {
	const term = document.getElementById("term").value || "eminem";
	const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=5`;

	axios.get(url)
		.then(response => {
			console.log(response.data);
			output.textContent = JSON.stringify(response.data.results, null, 2);
		})
		.catch(error => {
			console.error(error);
			output.textContent = "Error fetching data.";
		});
});
