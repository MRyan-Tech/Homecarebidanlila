import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const customTheme = {
  dark: false,
  colors: {
    primary: "#FF8E72", // Warm Coral / Peach Blush
    secondary: "#4CA69C", // Healing Teal / Mint Green
    accent: "#F8C868", // Sunshine Gold
    teal: "#4CA69C", // Healing Teal
    navy: "#1C2A39", // Deep Ink Navy
    background: "#FFFBF7", // Vanilla Cream / Cozy Warm Sand
    surface: "#FFFFFF",
    error: "#FF6B6B",
    info: "#5C85A8",
    success: "#4CA69C",
    warning: "#F8C868",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
