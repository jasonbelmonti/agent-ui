import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowProvider, } from "@xyflow/react";
const defaultBackgroundProps = {
    gap: 24,
    lineWidth: 1,
    variant: BackgroundVariant.Lines,
};
const defaultControlProps = {
    showInteractive: false,
};
const defaultRootStyle = {
    height: 520,
    minHeight: 320,
    position: "relative",
    width: "100%",
};
const overlayStyle = {
    alignItems: "center",
    display: "flex",
    inset: 0,
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
    zIndex: 2,
};
const overlayCardStyle = {
    background: "rgba(10, 10, 10, 0.9)",
    border: "1px solid rgba(245, 245, 240, 0.12)",
    color: "rgba(245, 245, 240, 0.78)",
    fontFamily: "var(--marathon-font-ui)",
    fontSize: 12,
    letterSpacing: "0.12em",
    maxWidth: 280,
    padding: "14px 18px",
    textAlign: "center",
    textTransform: "uppercase",
};
function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}
function renderOverlay(content, stateLabel) {
    return (_jsx("div", { "aria-live": "polite", style: overlayStyle, children: _jsx("div", { "aria-label": stateLabel, role: "status", style: overlayCardStyle, children: content }) }));
}
export function GraphCanvas({ backgroundProps, children, className, colorMode = "dark", controlProps, edgeTypes, edges, emptyState, fitView = true, fitViewOptions, loading = false, loadingState, miniMapProps, nodeTypes, nodes, onEdgeClick, onEdgesChange, onNodeClick, onNodesChange, onSelectionChange, reactFlowProps, showBackground = true, showControls = false, showMiniMap = false, style, }) {
    const backgroundConfig = { ...defaultBackgroundProps, ...backgroundProps };
    const controlsConfig = { ...defaultControlProps, ...controlProps };
    const rootStyle = { ...defaultRootStyle, ...style };
    const overlay = loading && loadingState !== null
        ? renderOverlay(loadingState ?? "Loading Graph", "Graph loading")
        : !loading && nodes.length === 0 && emptyState !== null
            ? renderOverlay(emptyState ?? "No Graph Data", "Empty graph")
            : null;
    return (_jsxs("div", { className: joinClassNames("marathon-graph-canvas", className), style: rootStyle, children: [_jsx(ReactFlowProvider, { children: _jsxs(ReactFlow, { className: "marathon-graph-canvas__surface", colorMode: colorMode, edgeTypes: edgeTypes, edges: edges, elementsSelectable: true, fitView: fitView, fitViewOptions: fitViewOptions, maxZoom: 1.6, minZoom: 0.25, nodeTypes: nodeTypes, nodes: nodes, nodesConnectable: false, nodesDraggable: false, onEdgeClick: onEdgeClick, onEdgesChange: onEdgesChange, onNodeClick: onNodeClick, onNodesChange: onNodesChange, onSelectionChange: onSelectionChange, panOnDrag: true, zoomOnDoubleClick: false, ...reactFlowProps, children: [showBackground ? _jsx(Background, { ...backgroundConfig }) : null, showControls ? _jsx(Controls, { ...controlsConfig }) : null, showMiniMap ? _jsx(MiniMap, { ...miniMapProps }) : null, children] }) }), overlay] }));
}
