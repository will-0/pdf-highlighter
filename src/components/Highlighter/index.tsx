import { guidGenerator } from "../../utils/id";
import { PDFViewer } from "pdfjs-dist/types/web/pdf_viewer"
import { getPagesFromRange } from 'react-pdf-highlighter/dist/esm/lib/pdfjs-dom';
import getClientRects from 'react-pdf-highlighter/dist/esm/lib/get-client-rects';
import getBoundingRect from 'react-pdf-highlighter/dist/esm/lib/get-bounding-rect';
import { viewportToScaled } from 'react-pdf-highlighter/dist/esm/lib/coordinates';
import ReactDOM from 'react-dom/client'
import React from "react";
import { Provider } from "react-redux";

// Types
import { LTWHP } from 'react-pdf-highlighter/dist/esm/types';

import HighlightLayer from "@components/HighlightLayer";
import store from "@state/index"
import { ContentActions } from "@state/content";
import { GeneralActions } from "@state/general";

interface ViewportPosition {
    boundingRect: LTWHP;
    rects: LTWHP[];
    pageNumber: number;
}

function getImmediateChildWithClass(node: Node, className: string) {
    let children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
        if ((children[i] as HTMLElement).classList.contains(className)) {
            return children[i];
        }
    }
    return null;
}

function fullsizeDiv() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.zIndex = "1";
    div.style.pointerEvents = "none";
    return div;
}

// function colouredDivWithPosition(position: DOMRect, color: string = "rgba(150, 250, 0, 1)") {
//     const div = document.createElement("div");
//     div.style.position = "fixed";
//     div.style.top = position.top + "px";
//     div.style.left = position.left + "px";
//     div.style.width = position.width + "px";
//     div.style.height = position.height + "px";
//     div.style.zIndex = "2";
//     div.style.pointerEvents = "none";
//     div.style.backgroundColor = color;
//     return div;
// }


namespace highlighter {
    export enum CoordinateReference {
        BODY,
        VIEWPORT
    }

    export enum HighlElOptions {
        CUSTOM = "pn-highlight",
        MARK = "mark"
    }

    type Coordinate = {
        x: number,
        y: number
    }

    export function getSelectionEndCoords(reference: CoordinateReference = CoordinateReference.BODY, doc: Document = document) {
        // Check that a range actually is selected
        var sel = doc.getSelection();
        if(!sel || !sel.rangeCount) {
            throw "No selection"
        }
        var range = sel.getRangeAt(0).cloneRange();  // create a copy of the range
        if (range.collapsed) {
            throw "Selection is collapsed"
        }

        // Insert a zero-width space character at the end of the range
        range.collapse(false);  // collapse to the end
        var dummyNode = doc.createElement('span');
        dummyNode.appendChild(doc.createTextNode('\u200B'));  // zero-width space
        range.insertNode(dummyNode);
        
        // Get the coordinates
        var rect = dummyNode.getBoundingClientRect();

        var coords: Coordinate

        switch (reference) {
            case CoordinateReference.BODY:
                coords = {x: rect.left + window.scrollX, y: rect.top + window.scrollY}
                break;
            case CoordinateReference.VIEWPORT:
                coords = {x: rect.left, y: rect.top}
                break;
        }
        
        // Cleanup
        if (dummyNode && dummyNode.parentNode) { dummyNode.parentNode.removeChild(dummyNode) }

        return coords;
    }

    export function highlightSelection() {

        let selection = document.getSelection();
        if (!selection || !(selection.rangeCount > 0)) {
            throw "No selection"
        }

        const guid = guidGenerator()
        let range = selection.getRangeAt(0);

        const pdfViewerApplication = (window as any).PDFViewerApplication;
        const pdfViewer = pdfViewerApplication.pdfViewer as PDFViewer;

        if (!range) { return }

        const pages = getPagesFromRange(range);
        if (!pages || pages.length === 0) { return; }

        // Fixed position + scroll - page position
        const rects = getClientRects(range, pages);
        if (rects.length === 0) { return; }

        const boundingRect = getBoundingRect(rects);
        // This bounding rect has been confirmed to be accurate
        

        const viewportPosition = {
            boundingRect,
            rects,
            pageNumber: pages[0].number,
        };

        const viewportPositionToScaled = ({ pageNumber, boundingRect, rects }: ViewportPosition) => {
            const viewport = pdfViewer.getPageView(pageNumber - 1).viewport;
            return {
                boundingRect: viewportToScaled(boundingRect, viewport),
                rects: (rects || []).map((rect) => viewportToScaled(rect, viewport)),
                pageNumber,
            };
        }

        // Set the page margin: this is needed for the highlight to be positioned correctly
        const pageStyle = window.getComputedStyle(pages[0].node);
        store.dispatch(GeneralActions.setMargins({
            top: parseInt(pageStyle.borderTopWidth),
            left: parseInt(pageStyle.borderLeftWidth),
        }))

        const scaledPosition = viewportPositionToScaled(viewportPosition);
        
        store.dispatch(ContentActions.addHighlight(
            {
                content: {
                  text: "No text here",
                },
                position: scaledPosition,
                comment: {
                  text: "Flow or TypeScript?",
                  emoji: "🔥",
                },
                id: guid,
              }
        ))

        // Create a div inside the textLayer, with width 100% and height 100%
        const hasHighlightLayer = (pages[0].node.getElementsByClassName("SynapcardHighlightLayer").length > 0)

        const pageNode = pages[0].node

        const textLayerNode = getImmediateChildWithClass(pageNode, "textLayer") as HTMLDivElement

        const viewport = pdfViewer.getPageView(pages[0].number - 1).viewport;
        
        if (!hasHighlightLayer) {
            const containerDiv = fullsizeDiv()
            textLayerNode.append(containerDiv)
            ReactDOM.createRoot(containerDiv).render(
                <React.StrictMode>
                    <Provider store={store}>
                        <HighlightLayer pagenumber={pages[0].number} viewport={viewport} />
                    </Provider>
                </React.StrictMode>
            )
        }
    }

    export function isTextSelected() {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0 ) { 
            return true
        } else {
            return false
        }
    }
}

export default highlighter