import PnIcon from "./components/Icon"
import highlighter from "@components/Highlighter"
import { debounce } from "lodash"

function iconClickHandler(_: PnIcon, __: any) {
    highlighter.highlightSelection(); // Highlight the selection
}

function mouseupListener(_: any) {
    try {
        if (highlighter.isTextSelected()) {
            const selection_end = highlighter.getSelectionEndCoords()
            const icon_location = { ...selection_end, x: selection_end.x + 2 }
            let pn_icon = new PnIcon(icon_location)
            pn_icon.setClickHandler((icon: PnIcon, event: any) => iconClickHandler(icon, event))
        }
    } catch {
        PnIcon.removeAllIcons()
    }
}

const debouncedMouseupListener = debounce(mouseupListener, 100)

async function init() {
    // Instantiate the store and set to the global variable
    document.addEventListener('mouseup', debouncedMouseupListener)
}

init();
console.info("Hello from Synapcard Content Script!")
export {} // This must be present to tag the file as a module and allow building