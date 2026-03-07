import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
import { useRef } from "react";
import { useSignalButtonCanvas } from "./signalButton/useSignalButtonCanvas.js";
import { clamp, joinClassNames, toCssLength, toneAccentRgb, toneClassName } from "./signalButton/utils.js";
function renderSignalContent(icon, children) {
    return (_jsxs("span", { className: "marathon-signal-button__content", children: [icon ? _jsx("span", { className: "marathon-signal-button__icon", children: icon }) : null, _jsx("span", { className: "marathon-signal-button__text", children: children })] }));
}
export function SignalButton({ children, className, edgeWidth = 24, fillPercent = 64, icon, sparkBurst = 0, style, tone = "primary", wakePercent = 0, ...buttonProps }) {
    const canvasRef = useRef(null);
    const resolvedFillPercent = clamp(fillPercent, 0, 100);
    const resolvedSparkBurst = clamp(sparkBurst, 0, 100);
    const resolvedWakePercent = clamp(wakePercent, 0, 100);
    const burstProgress = resolvedSparkBurst / 100;
    const burstFlash = Math.pow(Math.sin(burstProgress * Math.PI), 0.65) || 0;
    useSignalButtonCanvas({
        canvasRef,
        disabled: buttonProps.disabled,
        edgeWidth,
        fillPercent: resolvedFillPercent,
        sparkBurst: resolvedSparkBurst,
        tone,
        wakePercent: resolvedWakePercent,
    });
    const signalButtonStyle = {
        ...style,
        "--marathon-signal-button-accent-rgb": toneAccentRgb[tone],
        "--marathon-signal-button-burst-flash": `${burstFlash}`,
        "--marathon-signal-button-edge-width": toCssLength(edgeWidth) ?? "24px",
        "--marathon-signal-button-fill-size": `${resolvedFillPercent}%`,
        "--marathon-signal-button-shake-amp": `${burstFlash * 1.65}px`,
    };
    return (_jsxs(Button, { ...buttonProps, className: joinClassNames("marathon-signal-button", toneClassName[tone], className), style: signalButtonStyle, children: [_jsxs("span", { "aria-hidden": "true", className: "marathon-signal-button__surface", children: [_jsx("canvas", { ref: canvasRef, className: "marathon-signal-button__canvas" }), _jsx("span", { className: "marathon-signal-button__sheen" })] }), _jsx("span", { className: "marathon-signal-button__label", children: renderSignalContent(icon, children) })] }));
}
