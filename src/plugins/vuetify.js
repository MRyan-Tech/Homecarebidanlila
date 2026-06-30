import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const customTheme = {
  dark: false,
  colors: {
    primary: "#D69F96", // Luxury Dusty Rose / Rose Gold
    secondary: "#5E8C81", // Professional Muted Sage Green
    accent: "#E4B373", // Warm Sand / Champagne Gold
    teal: "#5E8C81", // Sage Green for medical/spa trust
    navy: "#2B3846", // Deep Slate Charcoal (very elegant typography & buttons)
    background: "#FAF6F0", // Premium Warm Ivory / Alabaster Cream
    surface: "#FFFFFF",
    error: "#E05A47",
    info: "#5C85A8",
    success: "#5E8C81",
    warning: "#E4B373",
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
