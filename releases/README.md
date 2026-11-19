# Local Release Staging Folder (`releases/`)

This directory is a **local staging folder** for the exported **Pay to Win** Windows PC (`x86_64`) build before publishing it to **GitHub Releases**.

> **Important:** Everything inside `releases/` (except this `README.md` and `.gitkeep`) is **gitignored** via `.gitignore`. GitHub rejects single files larger than 100 MB in normal Git commits, whereas **GitHub Releases** supports release assets up to **2 GB** per file for free.

---

## Critical Unity Packaging Rule

A bare `PayToWin.exe` exported by Unity **will NOT launch by itself**. A Unity Standalone Windows build requires its runtime files alongside the `.exe`:

- `PayToWin.exe`
- `UnityPlayer.dll`
- `PayToWin_Data/`
- `MonoBleedingEdge/` (Mono) or `GameAssembly.dll` (IL2CPP)
- `UnityCrashHandler64.exe` (optional)

Your colleague should deliver **one of two formats**:
1. **Single Windows Installer `.exe`** (e.g., packaged with Inno Setup or NSIS as `PayToWin_Setup_v2.0.60.exe`)
2. **Complete Zipped Unity Build `.zip`** (or the raw exported folder, which `./scripts/prepare-release.sh` will zip automatically)

---

## 3-Step Handoff Workflow

### 1. Stage the exported build
Drop the exported `.exe` installer, `.zip` archive, or unzipped Unity build folder into `releases/`:

```text
releases/
  PayToWin_Setup_v2.0.60.exe       # Option 1: installer .exe
  # OR
  PayToWin_Windows_x86_64_v2.0.60/ # Option 2: exported Unity build folder
```

### 2. Run the release helper script
From the repository root, run:

```sh
./scripts/prepare-release.sh releases/<file-or-folder> v2.0.60
```

The script will:
- Zip the folder into `releases/PayToWin_Windows_x86_64_v2.0.60.zip` (if you passed a directory)
- Detect the package format (`exe` or `zip`)
- Calculate exact file size and SHA-256 hash, saving `releases/<filename>.sha256`
- Print the ready-to-paste `window.GAME_DATA.release` fields and exact `gh release create` command

### 3. Publish to GitHub Releases & update `js/gameData.js`
1. Run the printed `gh release create ...` command (or upload both the build artifact and `.sha256` file manually in the GitHub Releases UI).
2. Copy the printed `release` fields into `window.GAME_DATA.release` inside `js/gameData.js` (setting `status: "available"` and filling in your GitHub `downloadUrl`).
3. Commit and push `js/gameData.js` to `main` so `download.html` and `index.html` go live immediately.
