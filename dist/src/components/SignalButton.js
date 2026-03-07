import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
import { useRef } from "react";
import { useSignalButtonCanvas } from "./signalButton/useSignalButtonCanvas.js";
import { blendChannels, clamp, formatRgbChannels, joinClassNames, resolveRewardChannels, toCssLength, toneAccentChannels, toneClassName, } from "./signalButton/utils.js";
function renderSignalContent(icon, children) {
    return (_jsxs("span", { className: "signal-ui-signal-button__content", children: [icon ? _jsx("span", { className: "signal-ui-signal-button__icon", children: icon }) : null, _jsx("span", { className: "signal-ui-signal-button__text", children: children })] }));
}
export function SignalButton({ children, className, cooldownPercent = 0, edgeWidth = 24, fillPercent = 64, icon, pulseBurst = 0, rewardColor, style, tone = "primary", wakePercent = 0, ...buttonProps }) {
    const canvasRef = useRef(null);
    const resolvedCooldownPercent = clamp(cooldownPercent, 0, 100);
    const resolvedFillPercent = clamp(fillPercent, 0, 100);
    const resolvedPulseBurst = clamp(pulseBurst, 0, 100);
    const resolvedWakePercent = clamp(wakePercent, 0, 100);
    const cooldownMix = resolvedCooldownPercent / 100;
    const rewardChannels = resolveRewardChannels(tone, rewardColor);
    const accentChannels = blendChannels(toneAccentChannels[tone], rewardChannels, cooldownMix);
    const burstProgress = resolvedPulseBurst / 100;
    const burstFlash = Math.pow(Math.sin(burstProgress * Math.PI), 0.65) || 0;
    useSignalButtonCanvas({
        canvasRef,
        cooldownPercent: resolvedCooldownPercent,
        disabled: buttonProps.disabled,
        edgeWidth,
        fillPercent: resolvedFillPercent,
        pulseBurst: resolvedPulseBurst,
        rewardChannels,
        tone,
        wakePercent: resolvedWakePercent,
    });
    const signalButtonStyle = {
        ...style,
        "--signal-ui-signal-button-accent-rgb": formatRgbChannels(accentChannels),
        "--signal-ui-signal-button-burst-flash": `${burstFlash}`,
        "--signal-ui-signal-button-cooldown": `${cooldownMix}`,
        "--signal-ui-signal-button-edge-width": toCssLength(edgeWidth) ?? "24px",
        "--signal-ui-signal-button-fill-size": `${resolvedFillPercent}%`,
        "--signal-ui-signal-button-shake-amp": `${burstFlash * 1.65}px`,
    };
    return (_jsxs(Button, { ...buttonProps, className: joinClassNames("signal-ui-signal-button", toneClassName[tone], className), style: signalButtonStyle, children: [_jsxs("span", { "aria-hidden": "true", className: "signal-ui-signal-button__surface", children: [_jsx("canvas", { ref: canvasRef, className: "signal-ui-signal-button__canvas" }), _jsx("span", { className: "signal-ui-signal-button__sheen" })] }), _jsx("span", { className: "signal-ui-signal-button__label", children: renderSignalContent(icon, children) })] }));
}
