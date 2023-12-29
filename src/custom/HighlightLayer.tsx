import { useEffect } from "react"
import Highlight from "./Highlight"
import { ContentSelectors } from "./state/content"
import { useSelector } from "react-redux"

interface HighlightLayerProps {
    viewport: any
}

export default function HighlightLayer({ viewport }: HighlightLayerProps) {

    const highlights = useSelector(ContentSelectors.getHiglights)

    useEffect(() => {
        console.log("Highlights: ", highlights)
    }, [highlights])

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
        {highlights.map((highlight, index) => {
            return (
                <Highlight viewport={viewport} key={index} highlight={highlight} />
            )}
        )}
        </div>
    )
}

