import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useSelector } from "react-redux";

export default function CriticalPath() {
    const criticalPath = useSelector((state) => state.criticalPath);
    const parent = document.getElementById("criticalPathGraph");
    const graphRef = useRef();

    return (
        <ForceGraph2D
            ref={graphRef}
            graphData={criticalPath}
            height={criticalPath.nodes.length * 25}
            width={parent.clientWidth}
            nodeLabel="id"
            nodeCanvasObject={(node, ctx, globalScale) => {
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 20 / globalScale, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.font = `bold ${15 / globalScale}px Arial`;
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(node.id, node.x, node.y);
            }}
            linkLabel="value"
            linkColor={() => "black"}
            linkWidth={2}
            linkCanvasObjectMode={() => "after"}
            linkCanvasObject={(link, ctx, globalScale) => {
                ctx.font = `bold ${15 / globalScale}px Arial`;
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillText(
                    link.value,
                    link.source.x + (link.target.x - link.source.x) / 2,
                    link.source.y + (link.target.y - link.source.y) / 2
                );
            }}
            linkDirectionalArrowLength={5}
            enableZoomInteraction={false}
            enablePanInteraction={false}
            enableNodeDrag={false}
            dagMode="lr"
            dagLevelDistance={
                parent.clientWidth / (criticalPath.nodes.length * 3)
            }
            onEngineStop={() => {
                graphRef.current.zoomToFit();
            }}
        />
    );
}
