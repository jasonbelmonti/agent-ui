import { App, ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { useInsertionEffect } from "react";
import type { PropsWithChildren } from "react";

import {
  createSignalTheme,
  createSignalThemeCssVariables,
  signalTheme,
  type SignalThemePreferences,
} from "../theme/signalTheme.js";

export type AntdThemeProviderProps = PropsWithChildren<{
  theme?: ThemeConfig;
  themePreferences?: SignalThemePreferences;
}>;

function useDocumentThemeVariables(themePreferences: SignalThemePreferences | undefined) {
  useInsertionEffect(() => {
    if (!themePreferences || typeof document === "undefined") {
      return;
    }

    const themeVariables = createSignalThemeCssVariables(themePreferences);
    const rootStyle = document.documentElement.style;
    const previousValues = new Map<string, string>();

    for (const [name, value] of Object.entries(themeVariables)) {
      previousValues.set(name, rootStyle.getPropertyValue(name));
      rootStyle.setProperty(name, String(value));
    }

    return () => {
      for (const [name, value] of previousValues) {
        if (value) {
          rootStyle.setProperty(name, value);
        } else {
          rootStyle.removeProperty(name);
        }
      }
    };
  }, [themePreferences]);
}

export function AntdThemeProvider({
  children,
  theme,
  themePreferences,
}: AntdThemeProviderProps) {
  const resolvedTheme =
    theme ?? (themePreferences ? createSignalTheme(themePreferences) : signalTheme);

  useDocumentThemeVariables(themePreferences);

  return (
    <ConfigProvider theme={resolvedTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export type InstallStaticAntdThemeOptions = Pick<
  AntdThemeProviderProps,
  "theme" | "themePreferences"
>;

export function installStaticAntdTheme(
  options: InstallStaticAntdThemeOptions = {},
) {
  ConfigProvider.config({
    holderRender: (children) => <AntdThemeProvider {...options}>{children}</AntdThemeProvider>,
  });
}
