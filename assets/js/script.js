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

  if (!/[a-zA-Z0-9]/.test(cleaned)) {
    return {
      valid: false,
      error: "❌ Please enter valid search terms (letters or numbers)",
    };
  }

  return { valid: true, error: null };
}

//MAIN SEARCH HANDLER

button.addEventListener("click", () => {
  const term = searchInput.value;

  const validation = validateInput(term);
  if (!validation.valid) {
    output.textContent = validation.error;
    output.style.color = 'red';
    return; 
  }

  output.textContent = '🔍 Searching for music...';
  output.style.color = 'blue';

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=25`;

  axios.get(url)
    .then(response => {
      const cleanData = cleanAllSongs(response.data.results);
      
      console.log('🎵 Raw data from iTunes:', response.data.results);
      console.log('✨ Clean data ready for UI:', cleanData);
      
      if (cleanData.length === 0) {
        output.textContent = `😕 No results found for "${term}"\n\nTry searching for:\n• A different artist name\n• A popular song title\n• An album name`;
        output.style.color = 'orange';
        return;
      }

	  output.style.color = 'black';
      output.textContent = `✅ Found ${cleanData.length} results for "${term}"!\n\nClean data ready for UI DEV to style:\n\n` + JSON.stringify(cleanData, null, 2);
	})
    .catch(error => {
		 console.error('❌ API Error:', error);

		 let errorMessage = '❌ Oops! Something went wrong.\n\n';

		 if (error.response) {
			errorMessage += `Error ${error.response.status}: `;
			switch (error.response.status) {
				case 400:
					errorMessage += 'Invalid request. Try different search terms.';
					break;
				case 403:
					errorMessage += 'Access denied. Try again later.';
					break;
				case 429:
					errorMessage += 'Too many requests. Wait a moment and try again.';
					break;
				case 500:
				case 503:
					errorMessage += 'iTunes service temporarily unavailable.';
					break;
				default:
					errorMessage += 'Your music taste is out of this planet!.';
			}
		} else if (error.request) {
    
        errorMessage += 'Could not connect to iTunes.\nCheck your internet connection.';
      	} else {
        errorMessage += 'Unexpected error: ' + error.message;
      	}
      
      output.textContent = errorMessage;
      output.style.color = 'red';
    });
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

