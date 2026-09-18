import type { ComponentType } from "react";
import type { Preview } from "@storybook/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { createAppTheme } from "../src/theme/createAppTheme";

const withTheme = (Story: ComponentType, context: { globals: { theme: PaletteMode } }) => {
  const mode = context.globals.theme ?? "light";
  return (
    <ThemeProvider theme={createAppTheme(mode)}>
      <CssBaseline />
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Light / dark theme, matching the app's ThemeProvider",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withTheme],
};

export default preview;
