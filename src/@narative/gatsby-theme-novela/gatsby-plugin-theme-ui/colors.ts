import prism from "./prism";
import novelaTheme from "@narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui";

export default {
  prism,

  primary: "#000",
  secondary: "#73737D",
  grey: "#73737D",
  background: "#fafafa",
  accent: "#eb2f06",
  hover: "rgba(0, 0, 0, 0.07)",
  gradient: "linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #D9DBE0 100%)",
  articleText: "#08080B",
  track: "rgba(8, 8, 11, 0.3)",
  progress: "#000",
  card: "#fff",
  error: "#EE565B",
  success: "#46B17B",
  errorBackground: "rgba(238, 86, 91, 0.1)",
  horizontalRule: "rgba(8, 8, 11, 0.15)",
  inputBackground: "rgba(0, 0, 0, 0.05)",
  modes: {
    dark: {
      grey: "#73737D",
      primary: "#fff",
      secondary: "#fff",
      accent: "#eb2f06",
      background: "#111216",
      hover: "rgba(255, 255, 255, 0.07)",
      gradient:
        "linear-gradient(180deg, #111216 0%, rgba(30, 39, 46, 0.36) 100%)",
      articleText: "#fff",
      track: "rgba(255, 255, 255, 0.3)",
      progress: "#fff",
      card: "#1D2128",
      error: "#EE565B",
      success: "#46B17B",
      errorBackground: "rgba(238, 86, 91, 0.1)",
      horizontalRule: "rgba(255, 255, 255, 0.15)",
      inputBackground: "rgba(255, 255, 255, 0.07)",
    },
  },
};
