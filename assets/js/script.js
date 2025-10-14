const button = document.getElementById("searchBtn");
const output = document.getElementById("output");
const searchInput = document.getElementById("term");

function cleanOneSong(messySong) {
  return {
    track: messySong.trackName || "Unknown Track",
    artist: messySong.artistName || "Unknown Artist",
    album: messySong.collectionName || "Unknown Album",
    artwork: messySong.artworkUrl100
      ? messySong.artworkUrl100.replace("100x100", "600x600")
      : null,
    preview: messySong.previewUrl || null,
    genre: messySong.primaryGenreName || "Unknown",
    duration: formatDuration(messySong.trackTimeMillis),
    year: messySong.releaseDate
      ? new Date(messySong.releaseDate).getFullYear()
      : null,
    price: messySong.trackPrice || "N/A",
  };
}

function cleanAllSongs(messySongs) {
  return messySongs.map((song) => cleanOneSong(song));
}

function formatDuration(ms) {
  if (!ms) return "Unknown";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


function validateInput(term) {
  const cleaned = term.trim();
  
  // Check if empty
  if (!cleaned) {
    return { 
      valid: false, 
      error: '❌ Please enter an artist, song, or album name' 
    };
  }

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
