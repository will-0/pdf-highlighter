import { GeneralState } from "./types"

export const GeneralSelectors = {
    getPdfUrl: (state: any) => (state.general as GeneralState).pdfUrl,
    getMargins: (state: any) => (state.general as GeneralState).margins,
}