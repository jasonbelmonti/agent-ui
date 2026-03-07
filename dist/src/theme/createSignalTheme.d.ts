import type { ThemeConfig } from "antd";
import type { CSSProperties } from "react";
import type { SignalPalette as ResolvedSignalPalette } from "./signalPalette.js";
import type { SignalThemePreferences } from "./signalThemePreferences.js";
export declare function resolveSignalPalette(preferences?: SignalThemePreferences): ResolvedSignalPalette;
export type SignalThemeStyleVariables = CSSProperties & Record<`--signal-ui-${string}`, string | number>;
export declare function createSignalThemeCssVariables(preferences?: SignalThemePreferences): SignalThemeStyleVariables;
export declare function createSignalTheme(preferences?: SignalThemePreferences): ThemeConfig;
