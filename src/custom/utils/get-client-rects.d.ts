interface LTWHP {
    left: number;
    top: number;
    width: number;
    height: number;
    pageNumber: number;
}

interface Page {
    node: HTMLElement;
    pageNumber: number;
}

declare const getClientRects: (range: Range, pages: Page[], shouldOptimize?: boolean) => Array<LTWHP>;
export default getClientRects;