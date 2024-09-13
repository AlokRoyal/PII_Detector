document.getElementById("start-btn").addEventListener("click", () => {
    // Start OCR process
    chrome.storage.local.set({ scanning: true });
    document.getElementById("output").innerHTML = "Please upload a document...";
    handleFileUpload();
});

document.getElementById("stop-btn").addEventListener("click", () => {
    chrome.storage.local.set({ scanning: false });
    document.getElementById("output").innerHTML = "Sorry! Cannot process your request.";
});

function handleFileUpload() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.onchange = async function () {
        let file = input.files[0];
        if (file) {
            document.getElementById("output").innerHTML = "Scanning document...";
            // Perform OCR scanning
            let text = await performOCR(file);
            analyzePII(text);
        }
    };
    input.click();
}

// Function to call OCR service (basic example using Tesseract.js)
async function performOCR(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = async function () {
            const { createWorker } = Tesseract;
            const worker = createWorker();
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(reader.result);
            await worker.terminate();
            resolve(text);
        };
        reader.readAsDataURL(file);
    });
}

// Function to analyze PII
function analyzePII(text) {
    const aadhaarPattern = /\b\d{4}\s\d{4}\s\d{4}\b/;
    const panPattern = /\b[A-Z]{5}\d{4}[A-Z]\b/;
    const phonePattern = /\b\d{10}\b/;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    let confidence = 0;
    let output = "Detected PII: <br>";

    if (aadhaarPattern.test(text)) {
        confidence += 30;
        output += "Aadhaar Number detected<br>";
    }
    if (panPattern.test(text)) {
        confidence += 25;
        output += "PAN Number detected<br>";
    }
    if (phonePattern.test(text)) {
        confidence += 15;
        output += "Phone Number detected<br>";
    }
    if (emailPattern.test(text)) {
        confidence += 10;
        output += "Email detected<br>";
    }

    confidence = Math.min(confidence, 100);
    output += `Confidence Score: ${confidence}%`;

    document.getElementById("output").innerHTML = output;
}