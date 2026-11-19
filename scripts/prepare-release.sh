#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Pay to Win — Release Staging & Metadata Helper
# Packages a Unity Windows build directory (if needed), computes size & SHA-256,
# writes releases/<filename>.sha256, and prints config + gh release command.
# ==============================================================================

usage() {
  cat <<'EOF'
Usage:
  ./scripts/prepare-release.sh <path-to-exe-zip-or-unity-folder> [version]

Examples:
  ./scripts/prepare-release.sh releases/PayToWin_Setup_v2.0.60.exe v2.0.60
  ./scripts/prepare-release.sh releases/PayToWin_Build_Folder v2.0.60
EOF
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage
  exit 1
fi

INPUT_PATH="$1"
VERSION="${2:-v2.0.60}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RELEASES_DIR="$REPO_ROOT/releases"
mkdir -p "$RELEASES_DIR"

if [[ ! -e "$INPUT_PATH" ]]; then
  echo "Error: Input path does not exist: $INPUT_PATH" >&2
  exit 1
fi

ARTIFACT_PATH=""
PACKAGE_TYPE=""

if [[ -d "$INPUT_PATH" ]]; then
  echo "Detected build directory: $INPUT_PATH"
  EXE_MATCH="$(find "$INPUT_PATH" -maxdepth 2 -iname '*.exe' -print -quit || true)"
  if [[ -z "$EXE_MATCH" ]]; then
    echo "Warning: No .exe file found inside '$INPUT_PATH'. Double-check that this is a complete Unity Windows build." >&2
  else
    echo "Found executable: $(basename "$EXE_MATCH")"
  fi

  if ! command -v zip >/dev/null 2>&1; then
    echo "Error: 'zip' command is required to package a build directory." >&2
    exit 1
  fi

  ZIP_NAME="PayToWin_Windows_x86_64_${VERSION}.zip"
  ARTIFACT_PATH="$RELEASES_DIR/$ZIP_NAME"
  rm -f "$ARTIFACT_PATH"

  ABS_INPUT_DIR="$(cd "$INPUT_PATH" && pwd)"
  PARENT_DIR="$(dirname "$ABS_INPUT_DIR")"
  TARGET_DIR_NAME="$(basename "$ABS_INPUT_DIR")"

  echo "Creating archive: releases/$ZIP_NAME ..."
  (
    cd "$PARENT_DIR"
    zip -r -q "$ARTIFACT_PATH" "$TARGET_DIR_NAME" -x "*/.DS_Store" "__MACOSX/*"
  )
  PACKAGE_TYPE="zip"
else
  ABS_INPUT_DIR="$(cd "$(dirname "$INPUT_PATH")" && pwd)"
  ARTIFACT_PATH="$ABS_INPUT_DIR/$(basename "$INPUT_PATH")"
  LOWER_NAME="$(printf '%s' "$(basename "$ARTIFACT_PATH")" | tr '[:upper:]' '[:lower:]')"
  case "$LOWER_NAME" in
    *.exe|*.msi)
      PACKAGE_TYPE="exe"
      ;;
    *.zip)
      PACKAGE_TYPE="zip"
      ;;
    *)
      echo "Error: Unsupported file extension for '$ARTIFACT_PATH'. Expected .exe, .msi, .zip, or a directory." >&2
      exit 1
      ;;
  esac
fi

FILENAME="$(basename "$ARTIFACT_PATH")"

# File size in bytes (macOS stat -f%z, GNU stat -c%s)
if FILE_BYTES="$(stat -f%z "$ARTIFACT_PATH" 2>/dev/null)"; then
  :
elif FILE_BYTES="$(stat -c%s "$ARTIFACT_PATH" 2>/dev/null)"; then
  :
else
  echo "Error: Unable to determine file size for $ARTIFACT_PATH" >&2
  exit 1
fi

# Human-readable size (GiB/MiB/KB)
HUMAN_SIZE="$(awk -v b="$FILE_BYTES" 'BEGIN {
  if (b >= 1073741824) printf "%.2f GB", b / 1073741824;
  else if (b >= 1048576) printf "%.1f MB", b / 1048576;
  else if (b >= 1024) printf "%.1f KB", b / 1024;
  else printf "%d B", b;
}')"

# Warn if exceeding GitHub Releases 2 GiB (2147483648 bytes) per-asset limit
if (( FILE_BYTES > 2147483648 )); then
  echo "WARNING: File size ($HUMAN_SIZE / $FILE_BYTES bytes) exceeds GitHub Releases 2 GB per-file limit!" >&2
  echo "         Consider splitting the archive or using external cloud object storage." >&2
fi

# Compute SHA-256 and write sidecar inside releases/ only
CHECKSUM_FILE="$RELEASES_DIR/${FILENAME}.sha256"
if command -v shasum >/dev/null 2>&1; then
  SHA256="$(shasum -a 256 "$ARTIFACT_PATH" | awk '{print $1}')"
elif command -v sha256sum >/dev/null 2>&1; then
  SHA256="$(sha256sum "$ARTIFACT_PATH" | awk '{print $1}')"
else
  echo "Error: Neither 'shasum' nor 'sha256sum' is available." >&2
  exit 1
fi

printf '%s  %s\n' "$SHA256" "$FILENAME" > "$CHECKSUM_FILE"

RELEASE_DATE="$(date +%Y-%m-%d)"

# Format artifact path cleanly if inside repo
DISPLAY_ARTIFACT="$ARTIFACT_PATH"
if [[ "$ARTIFACT_PATH" == "$REPO_ROOT/"* ]]; then
  DISPLAY_ARTIFACT="${ARTIFACT_PATH#"$REPO_ROOT/"}"
fi

cat <<EOF

================================================================================
Release Artifact Prepared
================================================================================
File:         $DISPLAY_ARTIFACT
Package Type: $PACKAGE_TYPE
Size:         $HUMAN_SIZE ($FILE_BYTES bytes)
SHA-256:      $SHA256
Checksum:     releases/${FILENAME}.sha256

--------------------------------------------------------------------------------
1) Paste into js/gameData.js -> window.GAME_DATA.release:
--------------------------------------------------------------------------------
  status: "available",
  statusLabel: "Build Ready for Download",
  statusMessage: "Standalone Windows PC (x86_64) build ${VERSION} is verified and ready for download.",
  packageType: "${PACKAGE_TYPE}",
  version: "${VERSION}",
  releaseDate: "${RELEASE_DATE}",
  fileName: "${FILENAME}",
  fileSize: "${HUMAN_SIZE}",
  sha256: "${SHA256}",
  downloadUrl: "https://github.com/<OWNER>/<REPO>/releases/download/${VERSION}/${FILENAME}",
  checksumFileUrl: "https://github.com/<OWNER>/<REPO>/releases/download/${VERSION}/${FILENAME}.sha256",

--------------------------------------------------------------------------------
2) Publish to GitHub Releases (run after setting your GitHub remote):
--------------------------------------------------------------------------------
gh release create "${VERSION}" \\
  "${DISPLAY_ARTIFACT}" \\
  "releases/${FILENAME}.sha256" \\
  --title "Pay to Win ${VERSION} (Windows x86_64)" \\
  --notes "Official Windows PC (x86_64) release ${VERSION}. Verify integrity with SHA-256: ${SHA256}"

================================================================================
EOF
