import type { RefObject } from "react";
import type { SignalButtonTone } from "./types.js";
type UseSignalButtonCanvasOptions = {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    disabled?: boolean;
    edgeWidth?: number | string;
    fillPercent: number;
    sparkBurst: number;
    tone: SignalButtonTone;
    wakePercent: number;
};
export declare function useSignalButtonCanvas({ canvasRef, disabled, edgeWidth, fillPercent, sparkBurst, tone, wakePercent, }: UseSignalButtonCanvasOptions): void;
export {};
