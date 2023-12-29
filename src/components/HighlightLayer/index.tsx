import Highlight from "@components/Highlight"
import { ContentSelectors } from "@state/content"
import { useSelector } from "react-redux"

interface HighlightLayerProps {
    viewport: any
    pagenumber: number
}

export default function HighlightLayer({ viewport, pagenumber }: HighlightLayerProps) {

    const highlights = useSelector(ContentSelectors.getHiglights)

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "1",
                pointerEvents: "none",
            }}
            className="SynapcardHighlightLayer"
        >
        <button style={{pointerEvents: "auto"}} onClick={() => console.log(highlights)}>log</button>
        {highlights.map((highlight, index) => {
            if (highlight.position.pageNumber === pagenumber)
            return (
                <Highlight viewport={viewport} key={index} highlight={highlight} />
            )}
        )}
        </div>
    )
}

