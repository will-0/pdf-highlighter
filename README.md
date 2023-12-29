# PDF Highlighter

This project builds off of [PDF.JS](https://github.com/mozilla/pdf.js) and [react-pdf-highlighter](https://github.com/agentcooper/react-pdf-highlighter).

## Get Started

1. Run `npm install`
2. Download PDFJS compiled files, and add the folder to root as `pdfjs`. This distribution can be downloaded from [https://github.com/mozilla/pdf.js/releases](https://github.com/mozilla/pdf.js/releases)
3. Copy the `/build` folder from PDFJS and put it into the `/public` folder (yes, it will mean having it twice).
4. Add example PDFs to the `/public` folder.
4. `npm run dev` to test the highlighter. It will be available at `http://localhost:5173/pdfjs/web/viewer.html?file=/your_example_pdf.pdf` (port number may vary: check terminal)