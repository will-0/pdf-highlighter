interface coordinate {
    x: number,
    y: number
}

class PnIcon {

    private static lastInstanceTime: number | null = null;
    private static cooldownPeriod: number = 500; // 500 milliseconds

    HIGHLIGHTER_ICON_PATH = "/example-icon.png"
    icon: HTMLImageElement

    constructor(coordinates: coordinate, doc: Document = document) {
        if (
            PnIcon.lastInstanceTime !== null &&
            Date.now() - PnIcon.lastInstanceTime < PnIcon.cooldownPeriod
          ) {
            throw new Error("Cannot create instance within cooldown period");
        }
        // Create new icon
        PnIcon.removeAllIcons()
        this.icon = doc.createElement("img");
        this.icon.src = this.HIGHLIGHTER_ICON_PATH;  // Assume you have an icon.png file in your extension
        this.icon.classList.add("highlighterIcon");
        this.icon.style.position = "absolute";
        this.icon.style.top = `${coordinates.y}px`;
        this.icon.style.left = `${coordinates.x}px`;  
        this.icon.style.zIndex = "9999"
        this.icon.style.cursor = "pointer"
        doc.body.appendChild(this.icon);
        document.addEventListener('mousedown', () => { PnIcon.removeAllIcons() });
        document.addEventListener('scroll', () => { PnIcon.removeAllIcons() });
        document.addEventListener('resize', () => { PnIcon.removeAllIcons() });
    }

    setClickHandler(handler: (icon: PnIcon, event: MouseEvent) => void) {
        this.icon.onmousedown = (event) => {
            handler(this, event)
        }
    }

    // Destructor
    remove() {
        this.icon.remove()
    }

    static removeAllIcons(doc: Document = document) {
        // Get all elements with a particular class
        var elements = doc.querySelectorAll('.highlighterIcon');

        // Iterate over the elements and remove them
        for (var i = 0; i < elements.length; i++) {
            const current_element = elements[i]
            if (current_element.parentNode) { 
                current_element.parentNode.removeChild(elements[i]); 
            }
        }
    }
}

export default PnIcon