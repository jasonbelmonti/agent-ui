function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function expandHexColor(hex) {
    if (!/^[0-9a-fA-F]+$/.test(hex)) {
        return null;
    }
    if (hex.length === 3 || hex.length === 4) {
        return hex
            .slice(0, 3)
            .split("")
            .map((segment) => `${segment}${segment}`)
            .join("");
    }
    if (hex.length === 6 || hex.length === 8) {
        return hex.slice(0, 6);
    }
    return null;
}
export function isHexColor(color) {
    if (!color) {
        return false;
    }
    const normalized = color.trim();
    return /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(normalized);
}
export function resolveHexColor(color, fallback) {
    return isHexColor(color) ? color : fallback;
}
function parseHexColor(color) {
    const normalized = color.trim().replace(/^#/, "");
    const hex = expandHexColor(normalized);
    if (!hex) {
        return null;
    }
    const red = Number.parseInt(hex.slice(0, 2), 16);
    const green = Number.parseInt(hex.slice(2, 4), 16);
    const blue = Number.parseInt(hex.slice(4, 6), 16);
    return { red, green, blue };
}
function formatHexColor({ red, green, blue }) {
    return `#${[red, green, blue]
        .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
        .join("")}`;
}
export function mixHexColors(color, mixWith, mixAmount) {
    const source = parseHexColor(color);
    const target = parseHexColor(mixWith);
    if (!source || !target) {
        return color;
    }
    const weight = clamp(mixAmount, 0, 1);
    return formatHexColor({
        red: source.red + (target.red - source.red) * weight,
        green: source.green + (target.green - source.green) * weight,
        blue: source.blue + (target.blue - source.blue) * weight,
    });
}
export function darkenHexColor(color, amount) {
    return mixHexColors(color, "#000000", amount);
}
export function lightenHexColor(color, amount) {
    return mixHexColors(color, "#ffffff", amount);
}
export function withAlpha(color, alpha) {
    const parsed = parseHexColor(color);
    if (!parsed) {
        return color;
    }
    return `rgba(${parsed.red}, ${parsed.green}, ${parsed.blue}, ${clamp(alpha, 0, 1)})`;
}
export function toRgbTriplet(color) {
    const parsed = parseHexColor(color);
    if (!parsed) {
        return null;
    }
    return `${parsed.red} ${parsed.green} ${parsed.blue}`;
}
