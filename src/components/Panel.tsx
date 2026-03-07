import { Card } from "antd";
import type { CardProps } from "antd";
import type { CSSProperties } from "react";

export type PanelCutCorner = "accent" | "notch";
export type PanelCutCornerPreset = "tactical" | "architectural";

export type PanelCutCornerPlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface PanelProps extends CardProps {
  cutCornerPreset?: PanelCutCornerPreset;
  cutCorner?: PanelCutCorner;
  cutCornerPlacement?: PanelCutCornerPlacement;
  cutCornerSize?: number | string;
  cutCornerColor?: string;
}

type PanelStyle = CSSProperties & {
  "--signal-ui-panel-cut-color"?: string;
  "--signal-ui-panel-cut-size"?: string;
};

type PanelCutCornerPresetDefinition = {
  cutCorner: PanelCutCorner;
  cutCornerColor: string;
  cutCornerPlacement: PanelCutCornerPlacement;
  cutCornerSize: number | string;
};

export const panelCutCornerPresets = {
  tactical: {
    cutCorner: "accent",
    cutCornerColor: "var(--signal-ui-primary)",
    cutCornerPlacement: "top-right",
    cutCornerSize: 26,
  },
  architectural: {
    cutCorner: "notch",
    cutCornerColor: "var(--signal-ui-primary)",
    cutCornerPlacement: "bottom-left",
    cutCornerSize: 24,
  },
} satisfies Record<PanelCutCornerPreset, PanelCutCornerPresetDefinition>;

function toCssLength(value: PanelProps["cutCornerSize"]) {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function Panel({
  className,
  cutCorner,
  cutCornerColor,
  cutCornerPreset,
  cutCornerPlacement,
  cutCornerSize,
  style,
  ...cardProps
}: PanelProps) {
  const preset = cutCornerPreset ? panelCutCornerPresets[cutCornerPreset] : undefined;
  const resolvedCutCorner = cutCorner ?? preset?.cutCorner;
  const resolvedCutCornerColor = cutCornerColor ?? preset?.cutCornerColor ?? "var(--signal-ui-primary)";
  const resolvedCutCornerPlacement = cutCornerPlacement ?? preset?.cutCornerPlacement ?? "top-right";
  const resolvedCutCornerSize = cutCornerSize ?? preset?.cutCornerSize ?? 26;
  const panelStyle: PanelStyle = {
    ...style,
    ...(resolvedCutCorner
      ? {
          "--signal-ui-panel-cut-color": resolvedCutCornerColor,
          "--signal-ui-panel-cut-size": toCssLength(resolvedCutCornerSize) ?? "26px",
        }
      : {}),
  };

  return (
    <Card
      {...cardProps}
      className={joinClassNames(
        "signal-ui-panel",
        resolvedCutCorner ? `signal-ui-panel--cut-${resolvedCutCorner}` : undefined,
        resolvedCutCorner ? `signal-ui-panel--corner-${resolvedCutCornerPlacement}` : undefined,
        className,
      )}
      style={panelStyle}
    />
  );
}
