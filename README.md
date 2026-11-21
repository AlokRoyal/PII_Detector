# PII Detector Browser Extension

A Chrome Manifest V3 extension prototype for scanning uploaded documents for personally identifiable information (PII). The popup is wired to OCR scripts, and the extension manifest declares a background service worker and local Tesseract.js resource.

## Stack

- Chrome Extensions Manifest V3
- HTML, CSS, and vanilla JavaScript
- Tesseract.js for OCR (the manifest expects `scripts/tesseract.min.js` to be available locally)

## Load the extension

1. Open `chrome://extensions` and enable **Developer mode**.
2. Choose **Load unpacked** and select the `pii-detector-extension/` directory.
3. Open the extension popup and try the document upload workflow.

## Structure

- `pii-detector-extension/manifest.json` — extension metadata and permissions
- `popup.html` and `scripts/popup.js` — extension popup UI and interactions
- `scripts/background.js` — service worker
- `scripts/ocr.js` — OCR-related logic
- `styles/` and `images/` — presentation assets

## Current setup note

The manifest references a local `scripts/tesseract.min.js` file. Confirm that this dependency is present before expecting OCR to run; the repository does not include an npm package manifest at the extension root.
