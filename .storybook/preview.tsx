import type { Preview } from "@storybook/react-webpack5";

import "antd/dist/reset.css";
import "@fontsource/azeret-mono/400.css";
import "@fontsource/azeret-mono/500.css";
import "@fontsource/oxanium/500.css";
import "@fontsource/oxanium/600.css";
import "@fontsource/oxanium/700.css";
import "../src/styles/theme.css";
import "../src/styles/storybook.css";

import { AntdThemeProvider } from "../src/providers/AntdThemeProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AntdThemeProvider>
        <div className="storybook-shell">
          <Story />
        </div>
      </AntdThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
    },
  },
};

export default preview;
