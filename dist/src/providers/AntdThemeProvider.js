import { jsx as _jsx } from "react/jsx-runtime";
import { App, ConfigProvider } from "antd";
import { marathonDosTheme } from "../theme/marathonDosTheme";
export function AntdThemeProvider({ children }) {
    return (_jsx(ConfigProvider, { theme: marathonDosTheme, children: _jsx(App, { children: children }) }));
}
export function installStaticAntdTheme() {
    ConfigProvider.config({
        holderRender: (children) => _jsx(AntdThemeProvider, { children: children }),
    });
}
