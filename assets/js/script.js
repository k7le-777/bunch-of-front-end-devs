const button = document.getElementById("searchBtn");
const output = document.getElementById("output");
const searchInput = document.getElementById("term");

// --- Utility functions ---
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
      error: "❌ Please enter valid search terms (letters or numbers)",
    };
  return { valid: true, error: null };
}

// --- Main search handler ---
function displayResults(cleanData) {
  output.innerHTML = ""; // Clear previous results
  cleanData.forEach((song) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.innerHTML = `
      <strong>${song.track}</strong> — ${song.artist}<br>
      Album: ${song.album} | Year: ${song.year} | Genre: ${song.genre}<br>
      ${song.preview ? `<audio controls src="${song.preview}"></audio>` : ""}
      <hr>
    `;
    output.appendChild(div);
  });
}

button.addEventListener("click", () => {
  const term = searchInput.value;
  const validation = validateInput(term);

  if (!validation.valid) {
    output.textContent = validation.error;
    output.style.color = "red";
    return;
  }

  output.textContent = "🔍 Searching for music...";
  output.style.color = "blue";

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&limit=25`;

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

// Press Enter to search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") button.click();
});
