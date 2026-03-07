import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PixelCubeLoader({ as, className, detail = "forming cube volume", gridSize = 3, label = "cli construct", size = 160, showLegend = true, style, tone = "primary", ...props }) {
    const gapSize = Math.max(4, Math.round(size * (gridSize === 2 ? 0.085 : 0.06)));
    const cellSize = Math.floor((size - gapSize * (gridSize - 1)) / gridSize);
    const stepSize = cellSize + gapSize;
    const depthOrigin = ((gridSize - 1) / 2) * stepSize;
    const voxels = createVoxelDescriptors(gridSize);
    const Root = as ?? (showLegend ? "div" : "span");
    const Wrapper = Root === "span" ? "span" : "div";
    const loaderClassName = [
        "signal-ui-pixel-cube-loader",
        toneClassName[tone],
        showLegend ? undefined : "signal-ui-pixel-cube-loader--mini",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    const rootStyle = {
        "--signal-ui-loader-cell-size": `${cellSize}px`,
        "--signal-ui-loader-depth-origin": `${depthOrigin}px`,
        "--signal-ui-loader-gap": `${gapSize}px`,
        "--signal-ui-loader-grid": gridSize,
        "--signal-ui-loader-size": `${size}px`,
        "--signal-ui-loader-step": `${stepSize}px`,
        ...style,
    };
    return (_jsxs(Root, { "aria-label": `${label}: ${detail}`, "aria-live": "polite", className: loaderClassName, role: "status", style: rootStyle, ...props, children: [_jsx(Wrapper, { className: "signal-ui-pixel-cube-loader__stage", children: _jsx(Wrapper, { className: "signal-ui-pixel-cube-loader__viewport", children: _jsx(Wrapper, { className: "signal-ui-pixel-cube-loader__scene-anchor", children: _jsx(Wrapper, { className: "signal-ui-pixel-cube-loader__scene", children: _jsx(Wrapper, { className: "signal-ui-pixel-cube-loader__scene-spin", children: voxels.map((voxel) => (_jsxs("span", { "aria-hidden": "true", className: [
                                        "signal-ui-pixel-cube-loader__voxel",
                                        voxel.depth === 0
                                            ? "signal-ui-pixel-cube-loader__voxel--front"
                                            : "signal-ui-pixel-cube-loader__voxel--deep",
                                    ].join(" "), "data-tone": voxel.tone, style: getVoxelStyle(voxel), children: [_jsx("span", { className: "signal-ui-pixel-cube-loader__voxel-face signal-ui-pixel-cube-loader__voxel-face--front" }), _jsx("span", { className: "signal-ui-pixel-cube-loader__voxel-face signal-ui-pixel-cube-loader__voxel-face--left" }), _jsx("span", { className: "signal-ui-pixel-cube-loader__voxel-face signal-ui-pixel-cube-loader__voxel-face--top" })] }, voxel.index))) }) }) }) }) }), showLegend ? (_jsxs(Wrapper, { className: "signal-ui-pixel-cube-loader__legend", children: [_jsx("span", { className: "signal-ui-pixel-cube-loader__label", children: label }), _jsxs("span", { className: "signal-ui-pixel-cube-loader__detail", children: [detail, _jsx("span", { "aria-hidden": "true", className: "signal-ui-pixel-cube-loader__cursor" })] })] })) : null] }));
}
const toneClassName = {
    primary: undefined,
    violet: "signal-ui-pixel-cube-loader--violet",
};
function createVoxelDescriptors(gridSize) {
    const center = (gridSize - 1) / 2;
    return Array.from({ length: gridSize ** 3 }, (_, index) => {
        const column = index % gridSize;
        const row = Math.floor(index / gridSize) % gridSize;
        const depth = Math.floor(index / (gridSize * gridSize));
        const x = column - center;
        const y = row - center;
        const tone = row === 0 && column === 0
            ? "lit"
            : row === gridSize - 1 && column === gridSize - 1
                ? "shade"
                : "solid";
        return {
            column,
            depth,
            index,
            row,
            tone,
            x,
            y,
            z: center - depth,
        };
    });
}
function getVoxelStyle(voxel) {
    return {
        "--signal-ui-loader-x": voxel.x,
        "--signal-ui-loader-y": voxel.y,
        "--signal-ui-loader-z": voxel.z,
    };
}
