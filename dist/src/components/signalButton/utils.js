export const toneAccentRgb = {
    primary: "192 254 4",
    violet: "159 77 255",
};
export const toneAccentChannels = {
    primary: [192, 254, 4],
    violet: [159, 77, 255],
};
export const toneClassName = {
    primary: "marathon-signal-button--primary",
    violet: "marathon-signal-button--violet",
};
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function lerp(start, end, amount) {
    return start + (end - start) * amount;
}
export function toCssLength(value) {
    if (value === undefined) {
        return undefined;
    }
    return typeof value === "number" ? `${value}px` : value;
}
export function toPixelLength(value, fallback = 24) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof value === "string") {
        const parsed = Number.parseFloat(value);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }
    return fallback;
}
export function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}
