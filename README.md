# PII Detector Browser Extension

A Chrome extension prototype for selecting a document and running OCR-related processing intended to identify personally identifiable information (PII). It uses a Manifest V3 extension structure with a popup interface and background service worker.

## Structure and flow

- manifest.json declares the extension popup, service worker, permissions, and web-accessible resources.
- popup.html and scripts/popup.js provide the popup interface and upload interaction.
- scripts/ocr.js contains OCR-related logic.
- scripts/background.js is the background service worker.
- styles/ and images/ hold the UI styling and icon assets.

The manifest declares storage permission and references a local Tesseract.js script.

## Load in Chrome

1. Open chrome://extensions.
2. Enable Developer mode.
3. Select Load unpacked and choose the pii-detector-extension/ folder.
4. Open the extension popup and try the available document workflow.

## Dependency and project status

The manifest expects scripts/tesseract.min.js, but that file is not listed in the repository tree. There is no npm package manifest in the extension folder. Supply the OCR library before expecting OCR processing to work.

This is a prototype. Treat detections as review prompts and verify them manually before using them for decisions involving sensitive documents.