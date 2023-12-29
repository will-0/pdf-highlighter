interface LTWHP {
    left: number;
    top: number;
    width: number;
    height: number;
    pageNumber: number;
}

declare const optimizeClientRects: (clientRects: Array<LTWHP>) => Array<LTWHP>;
export default optimizeClientRects;
