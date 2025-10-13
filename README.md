# 🎵 [Project name ] 

Group collab between, Mitch, Jimmy and Ryan.

# Music Discovery App

A dynamic music search application that uses the iTunes Search API to help users discover songs, albums, and artists with real-time previews.

## 🔗 Links

- **Live Demo:** [Coming Soon - Will be deployed on GitHub Pages]
- **Repository:** (https://github.com/k7le-777/bunch-of-front-end-devs)
- **API Documentation:** [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)

---

## 👥 Team Members


- **Mitch & Jimmy** - UI Developer (HTML/CSS, responsive design, styling)  
- **Jimmy & Mitch** - Integration Lead (DOM manipulation, user flow, testing)
- **Ryan** - API Developer (API integration, data handling, async logic)

---

## 🎯 Project Overview

### Purpose
This application allows users to search for music by artist name, song title, or album. Users can view results with album artwork, artist information, and play 30-second audio previews directly in the browser.

### Key Features (MVP)

#### Required Features (Per Rubric):
- ✅ **User input validation** - Search field with error handling
- ✅ **Query 3rd Party API** - iTunes Search API integration
- ✅ **Display data-driven results** - Dynamic rendering of search results
- ✅ **Responsive design** - Works on mobile, tablet, and desktop
- ✅ **Error handling** - Graceful handling of API errors and invalid input

#### Core Features:
- 🔍 Search for artists, songs, or albums
- 🖼️ Display album artwork
- 🎵 Play 30-second audio previews
- 📱 Responsive grid layout
- ⚠️ User feedback for errors and loading states

### Stretch Goals
- ⭐ Filter results by media type (songs/albums/artists)
- ⭐ Save favorite tracks to localStorage
- ⭐ Recently searched history
- ⭐ Sort results by name, release date, or popularity
- ⭐ Dark mode toggle

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Grid layout, Flexbox, animations
- **JavaScript (ES6+)** - Fetch API, async/await, DOM manipulation
- **iTunes Search API** - Music data and preview URLs
- **Git & GitHub** - Version control and team collaboration
- **GitHub Pages** - Deployment platform

---

## 📡 API Information

### iTunes Search API

**Why We Chose This API:**
- ✅ No authentication required (no API keys!)
- ✅ Rich data (songs, albums, artists, artwork)
- ✅ 30-second audio preview URLs
- ✅ Well-documented and reliable
- ✅ Fast response times

**Base URL:**
https://itunes.apple.com/search
**Example Request:**
https://itunes.apple.com/search?term=adele&limit=25&media=music

**Query Parameters:**
- `term` - Search keyword (required)
- `limit` - Number of results (default: 50, we'll use 20-25)
- `media` - Filter by media type (we'll use "music")
- `entity` - Specific entity type (song, album, artist)

**Sample Response Structure:**
```json
{
  "resultCount": 25,
  "results": [
    {
      "artistName": "Adele",
      "trackName": "Hello",
      "collectionName": "25",
      "artworkUrl100": "https://...",
      "previewUrl": "https://audio-ssl.itunes.apple.com/...",
      "primaryGenreName": "Pop",
      "releaseDate": "2015-10-23T07:00:00Z",
      "trackPrice": 1.29,
      "currency": "USD",
      "trackTimeMillis": 295493,
      "wrapperType": "track"
    }
  ]
}
```

**Key Data Fields:**

artistName - Artist name
trackName - Song title
collectionName - Album name
artworkUrl100 - Album art (100x100px, can be scaled to 600x600)
previewUrl - 30-second MP3 preview
primaryGenreName - Music genre
releaseDate - Release date
wrapperType - "track", "collection", or "artist"

**How to Use**

Search: Enter an artist, song, or album name
Submit: Click "Search" or press Enter
Browse: View results in a responsive grid
Preview: Click play button on any result card
Enjoy: Discover new music!

**-----------------**

**🔄 Git Workflow**
Branch Naming Convention
feature/api-integration
feature/search-ui
feature/results-display
fix/audio-player-bug
docs/update-readme

**Commit Message Format**
feat: add search functionality
fix: resolve audio playback issue
style: improve card layout
docs: update API documentation
refactor: extract validation logic

**Collaboration Process**

Pull latest changes: git pull origin main
Create feature branch: git checkout -b feature/your-feature
Make changes and commit
Push branch: git push origin feature/your-feature
Create Pull Request on GitHub
Request teammate review
Merge after approval

**🤝 Contributing**
For Team Members
Before Starting Work:

git checkout main
git pull origin main
git checkout -b feature/your-feature-name

**During Development:**

Commit frequently with clear messages
Test your code before pushing
Comment complex logic

**After Completing Feature:**
bashgit add .
git commit -m "feat: descriptive message"
git push origin feature/your-feature-name

Then create a Pull Request on GitHub for team review.
**------------------------**

🎓 Learning Objectives
Technical Skills

API Integration: Fetching and parsing JSON data
Asynchronous JavaScript: Promises, async/await
DOM Manipulation: Creating and updating elements dynamically
Error Handling: Try/catch blocks, user feedback
Responsive Design: Mobile-first CSS, media queries
Audio Integration: HTML5 audio element

Collaboration Skills

Git Workflow: Feature branches, pull requests, code reviews
Team Communication: Daily standups, blocker resolution
Task Management: Breaking features into commits
Code Quality: Comments, naming conventions, DRY principles

📚 Resources

iTunes Search API Documentation
MDN Fetch API
MDN Async Functions
CSS Grid Complete Guide
HTML5 Audio Element

⭐ Built with passion by [Your Team Name]
Powered by iTunes Search API