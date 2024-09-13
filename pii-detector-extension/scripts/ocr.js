// Import Tesseract.js library (if you're using a bundler or module system)
// If you're using a script tag in popup.html, you don't need this import line.
// const { createWorker } = Tesseract;

// Function to perform OCR on an uploaded image or PDF file
async function performOCR(file) {
    // Create a new FileReader object to read the file
    const reader = new FileReader();

    // Return a promise that resolves when the OCR process is complete
    return new Promise((resolve, reject) => {
        // Set up what to do when the file is loaded by the FileReader
        reader.onload = async function () {
            try {
                // Create a new Tesseract.js worker to handle OCR processing
                const worker = Tesseract.createWorker();

                // Load the worker and initialize with the required language (English here)
                await worker.load();
                await worker.loadLanguage('eng'); // You can add other languages if needed
                await worker.initialize('eng');

                // Run the OCR process on the file and extract the text
                const { data: { text } } = await worker.recognize(reader.result);

                // Terminate the worker after the OCR process is complete
                await worker.terminate();

                // Resolve the promise with the extracted text
                resolve(text);

            } catch (error) {
                // In case of an error, reject the promise
                reject(error);
            }
        };

        // If the file fails to load, reject the promise
        reader.onerror = function (error) {
            reject(error);
        };

        // Read the uploaded file as a data URL (this converts it to base64 for Tesseract.js)
        reader.readAsDataURL(file);
    });
}
