# PII Detector Browser Extension

![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)

A browser extension prototype for selecting a document and running OCR-related processing intended to identify personally identifiable information. It uses a Manifest V3 popup and background service worker.

## Features in the repository

- Extension popup with a document upload interaction
- OCR processing logic in a separate script
- Background service worker
- Local styling and extension icon resources
- Manifest permission declaration for storage

## Architecture

Chrome extension → popup.html / popup.js → OCR helper
                              ↘ background service worker
                              ↘ local assets and styles

The manifest declares the extension entry points and exposes a local Tesseract.js resource to matching pages.

## Install for development

1. Open chrome://extensions in Chrome.
2. Enable Developer mode.
3. Select Load unpacked.
4. Choose the pii-detector-extension/ folder.
5. Open the extension popup to try the available workflow.

## Project layout

- pii-detector-extension/manifest.json — extension configuration
- popup.html — popup markup
- scripts/popup.js — popup interactions
- scripts/ocr.js — OCR-related logic
- scripts/background.js — service worker
- styles/ and images/ — UI assets

## Dependency and limitations

The manifest references scripts/tesseract.min.js, but that file is not listed in the repository tree. There is no npm package manifest. Supply the expected OCR library and confirm supported document formats before relying on OCR behavior. This is a prototype; verify any detection manually, especially for sensitive or regulated use. No test workflow is listed.