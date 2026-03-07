import { App, ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

import { signalTheme } from "../theme/signalTheme.js";

export function AntdThemeProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={signalTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export function installStaticAntdTheme() {
  ConfigProvider.config({
    holderRender: (children) => <AntdThemeProvider>{children}</AntdThemeProvider>,
  });
}
