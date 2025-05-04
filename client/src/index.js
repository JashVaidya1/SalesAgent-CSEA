import React from "react";
import { createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "App";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<BrowserRouter>
  <VisionUIControllerProvider>
    <App />
  </VisionUIControllerProvider>
</BrowserRouter>)

