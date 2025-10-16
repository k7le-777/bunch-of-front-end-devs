const button = document.getElementById("searchBtn");
const output = document.getElementById("output");
const searchInput = document.getElementById("term");

function cleanOneSong(song) {
  return {
    track: song.trackName || "Unknown Track",
    artist: song.artistName || "Unknown Artist",
    album: song.collectionName || "Unknown Album",
    artwork: song.artworkUrl100
      ? song.artworkUrl100.replace("100x100", "200x200")
      : null,
    preview: song.previewUrl || null,
    genre: song.primaryGenreName || "Unknown",
    year: song.releaseDate ? new Date(song.releaseDate).getFullYear() : null,
  };
}

function cleanAllSongs(songs) {
  return songs.map(cleanOneSong);
}

function validateInput(term) {
  const cleaned = term.trim();
  if (!cleaned)
    return {
      valid: false,
      error: "❌ Please enter an artist, song, or album name",
    };
  if (!/[a-zA-Z0-9]/.test(cleaned))
    return {
      valid: false,
      error: "❌ Enter valid search terms (letters or numbers)",
    };
  return { valid: true, error: null };
}

function displayResults(cleanData) {
  output.textContent = ""; 
  const fragment = document.createDocumentFragment();

  cleanData.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song");

    if (song.artwork) {
      const img = document.createElement("img");
      img.src = song.artwork;
      img.alt = `${song.track} artwork`;
      songDiv.appendChild(img);
    }

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const trackEl = document.createElement("strong");
    trackEl.textContent = song.track;
    infoDiv.appendChild(trackEl);

    const artistEl = document.createElement("p");
    artistEl.textContent = `Artist: ${song.artist}`;
    infoDiv.appendChild(artistEl);

    const albumEl = document.createElement("p");
    albumEl.textContent = `Album: ${song.album} | Year: ${song.year}`;
    infoDiv.appendChild(albumEl);

    const genreEl = document.createElement("p");
    genreEl.textContent = `Genre: ${song.genre}`;
    infoDiv.appendChild(genreEl);

    if (song.preview) {
      const audioEl = document.createElement("audio");
      audioEl.controls = true;
      audioEl.src = song.preview;
      infoDiv.appendChild(audioEl);
    }

    songDiv.appendChild(infoDiv);
    fragment.appendChild(songDiv);
  });

  output.appendChild(fragment);
}

function showLoading() {
  output.textContent = "🔄 Searching for music...";
  output.style.color = "blue";
}


button.addEventListener("click", () => {
  const term = searchInput.value;
  const validation = validateInput(term);

  if (!validation.valid) {
    output.textContent = validation.error;
    output.style.color = "red";
    return;
  }

  showLoading();

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&limit=25&media=music&entity=song`;

  axios
    .get(url)
    .then((response) => {
      const cleanData = cleanAllSongs(response.data.results);

      if (cleanData.length === 0) {
        output.textContent = `😕 No results found for "${term}"`;
        output.style.color = "orange";
        return;
      }

      displayResults(cleanData);
    })
    .catch((error) => {
      console.error("❌ API Error:", error);
      output.textContent =
        "❌ Something went wrong. Check console for details.";
      output.style.color = "red";
    });
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") button.click();
});
