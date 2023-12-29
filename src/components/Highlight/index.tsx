import { IHighlight, LTWHP } from "react-pdf-highlighter";
import { scaledToViewport } from "react-pdf-highlighter/dist/esm/lib/coordinates";
import { Scaled } from "react-pdf-highlighter"
import { GeneralSelectors } from "@state/general";
import { useSelector } from "react-redux";

interface HighlightProps {
    highlight: IHighlight,
    key: number,
    viewport: any
}

export default function Highlight({ highlight, viewport }: HighlightProps) {
    // React component to mimic above function
    const margins = useSelector(GeneralSelectors.getMargins);

    const { position } = highlight;
    const { rects } = position;
    const scaledPositions: Scaled[] = rects;

    return (
        <>
        {   
            scaledPositions.map((pos, index) => {
                const {left, top, width, height }: LTWHP = scaledToViewport(pos, viewport);
                return (
                    <div
                    key={index}
                    style={{
                        backgroundColor: "rgba(150, 250, 0, 1)",
                        cursor: "pointer",
                        width: width,
                        height: height,
                        position: "absolute",
                        top: top - margins.top,
                        left: left - margins.left,
                        zIndex: "3",
                        pointerEvents: "auto",
                        margin: "0",
                    }}
                    className="SynapcardHighlight"
                />
                )
            }) 
        }
        </>
)
}