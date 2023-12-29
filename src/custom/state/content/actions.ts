import contentSlice from './reducer'

export namespace ContentActions {
    export const setContent = contentSlice.actions.setAppContent
    export const addHighlight = contentSlice.actions.addHighlight
    export const updateHighlightByID = contentSlice.actions.updateHighlightByID
    export const reset = contentSlice.actions.reset
}