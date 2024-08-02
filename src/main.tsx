import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./localization/i18n.ts";
import theme from "./theme.ts";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("lrw-widget")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
