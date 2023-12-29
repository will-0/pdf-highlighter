export function isInPDFContext() {
    return (window.hasOwnProperty("PN_CTX_PDF_JS"))
}

export function getPDFLinkFromUrl(url: string) {
    const urlObj = new URL(url)
    const pdfLink = urlObj.searchParams.get("file")
    if (!pdfLink) {
        throw new Error("No PDF link found")
    }
    return pdfLink
}