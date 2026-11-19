# Pay to Win — Official Game Website & Download Portal (KLXJ Studios)

Official promotional showcase, interactive gameplay portal, and Windows PC (`x86_64`) download hub for **Pay to Win** (`v2.0.60`), built in **Unity 2022.3.62f3 LTS (URP 14.0.12)**.

---

## Project Structure

```text
PayToWinWebsite/
├── index.html                  # Main game portal (trailer, story cinematic, 30s dilemma, arsenal, waves, install summary)
├── download.html               # Dedicated Windows download & verification portal
├── css/
│   └── styles.css              # Wasteland-tactical theme, responsive grid, accordion & copy UI
├── js/
│   ├── gameData.js             # Centralized game metadata + window.GAME_DATA.release config
│   ├── main.js                 # Trailer/story players, 30s dilemma simulator, wave tabs, gallery lightbox
│   └── download.js             # Release state binding, OS detection, accessible copy buttons & FAQ controls
├── releases/
│   ├── .gitkeep
│   └── README.md               # Local staging instructions (binaries inside releases/ are gitignored)
├── scripts/
│   └── prepare-release.sh      # Helper to package Unity builds, compute SHA-256, and generate release metadata
├── assets/                     # Trailers, story video, weapon renders, and 1080p combat screenshots
├── .gitignore                  # Ignores large binaries (.exe, .zip, .dll, *_Data/) and OS junk
├── .gitattributes              # Consistent LF/CRLF line endings and binary asset handling
└── .nojekyll                   # Disables Jekyll processing on GitHub Pages
```

---

## First-Time GitHub & GitHub Pages Setup

This repository is initialized on `main` and ignores `.exe` / `.zip` / Unity build folders so large binaries are distributed through **GitHub Releases** (up to 2 GB per file) instead of Git commits (which fail above 100 MB).

1. **Review and make your initial commit:**
   ```sh
   git status
   git add .
   git commit -m "Initialize Pay to Win website and download portal"
   ```
2. **Create a GitHub repository and push:**
   ```sh
   git remote add origin https://github.com/<OWNER>/<REPO>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Open **Settings → Pages** on GitHub.
   - Set **Source** to **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, and save.

> **Repository size note:** `assets/PayToWin_Official_Trailer.mp4` is ~81 MB (under GitHub's 100 MB hard limit, though GitHub prints a soft warning above 50 MB). Two unused files (`assets/PayToWin Story Complete.mp4` at 19 MB and `assets/Brute_Zombie.jpg` at 2.9 MB) are kept in `assets/` untouched; you can remove or relocate them later if you want a smaller repository clone.

---

## Local Preview & QA Modes

Start a local static server from the project root:

```sh
python3 -m http.server 8080
```

Useful preview URLs:
- `http://localhost:8080/index.html` — Main showcase portal
- `http://localhost:8080/download.html` — Download portal (defaults to **Build Export in Progress** until `release.status` is set to `"available"`)
- `http://localhost:8080/download.html?preview=ready` — Simulates a live downloadable build with sample size, SHA-256, and active download state for UI QA
- `http://localhost:8080/download.html?debug=placeholders` (or `index.html?debug=placeholders`) — Highlights customizable placeholder fields

---

## Publishing the `.exe` Once Unity Export Finishes

1. Have your colleague export either:
   - A single Windows installer `.exe` (e.g., `PayToWin_Setup_v2.0.60.exe`), **or**
   - The full Unity Standalone Windows build folder (must keep `PayToWin.exe`, `UnityPlayer.dll`, `PayToWin_Data/`, etc. together) / a `.zip` archive of that folder.
2. Place the file or folder in `releases/` and run:
   ```sh
   ./scripts/prepare-release.sh releases/<file-or-folder> v2.0.60
   ```
3. Run the `gh release create` command printed by the script (or upload the artifact + `.sha256` sidecar manually in GitHub Releases).
4. Copy the printed `window.GAME_DATA.release` fields into `js/gameData.js`, replace `<OWNER>/<REPO>` with your GitHub repository path, and push `js/gameData.js` to `main`.
