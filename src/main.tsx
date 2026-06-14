import { ViteReactSSG } from "vite-react-ssg";
import routes from "./routes";

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // App-level initialization (analytics, etc.)
    console.log("YellowHub SSG initialized");
  }
);
