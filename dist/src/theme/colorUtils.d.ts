export type HexColor = `#${string}`;
export declare function isHexColor(color: string | undefined): color is HexColor;
export declare function resolveHexColor(color: string | undefined, fallback: HexColor): HexColor;
export declare function mixHexColors(color: string, mixWith: string, mixAmount: number): string;
export declare function darkenHexColor(color: string, amount: number): string;
export declare function lightenHexColor(color: string, amount: number): string;
export declare function withAlpha(color: string, alpha: number): string;
export declare function toRgbTriplet(color: string): string | null;
