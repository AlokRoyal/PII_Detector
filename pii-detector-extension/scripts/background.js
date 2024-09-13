chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ scanning: false });
});

chrome.action.onClicked.addListener(() => {
    chrome.storage.local.get(["scanning"], function(result) {
        if (result.scanning) {
            chrome.storage.local.set({ scanning: false });
        }
    });
});