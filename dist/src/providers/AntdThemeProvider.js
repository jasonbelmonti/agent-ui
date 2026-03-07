import { jsx as _jsx } from "react/jsx-runtime";
import { App, ConfigProvider } from "antd";
import { signalTheme } from "../theme/signalTheme.js";
export function AntdThemeProvider({ children }) {
    return (_jsx(ConfigProvider, { theme: signalTheme, children: _jsx(App, { children: children }) }));
}
export function installStaticAntdTheme() {
    ConfigProvider.config({
        holderRender: (children) => _jsx(AntdThemeProvider, { children: children }),
    });
}
