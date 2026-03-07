import type { SignalButtonTone } from "./types.js";
type SignalButtonBufferOptions = {
    ctx: CanvasRenderingContext2D;
    cols: number;
    rows: number;
    fillPercent: number;
    edgeWidthPx: number;
    sparkBurst: number;
    tone: SignalButtonTone;
    timeMs: number;
    wakePercent: number;
    disabled?: boolean;
};
export declare function renderSignalButtonBuffer({ ctx, cols, rows, fillPercent, edgeWidthPx, sparkBurst, tone, timeMs, wakePercent, disabled, }: SignalButtonBufferOptions): void;
export {};
