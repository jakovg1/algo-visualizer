import { createRoot } from "react-dom/client";
import "./index.css";
import "./variables.scss";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    {/* <StrictMode></StrictMode> */}
    <App />
  </MantineProvider>
);
