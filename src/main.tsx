import React from "react";
import { ChakraProvider, Portal } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import App from "./App.tsx";
// import { ChakraProvider } from "@chakra-ui/react";
import "./localization/i18n.ts";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// const container = document.getElementById("usage-stats");
// if (container) {
//   // Crea el Shadow DOM
//   const shadowRoot = container.attachShadow({ mode: "open" });

//   // Renderiza la aplicación dentro del Shadow DOM
//   ReactDOM.createRoot(shadowRoot).render(
//     <React.StrictMode>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </React.StrictMode>
//   );
// }

const WidgetWrapper = ({ root }: { root: HTMLBodyElement }) => {
  const cache = createCache({ key: "c", container: root });

  const rootRef = React.useRef<HTMLBodyElement>(root);
  return (
    <Portal containerRef={rootRef}>
      <CacheProvider value={cache}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </CacheProvider>
    </Portal>
  );
};

function getRootElement() {
  const div = document.getElementById("usage-stats");
  if (div){

  // const div = document.createElement("div");
  // div.id = "usage-stats";
  const body = document.createElement("body");
  document.body.appendChild(div);
  const shadowDom = div.attachShadow({ mode: "open" });
  shadowDom.appendChild(body);
  return body;
}
}

const initSnap = () => {
  let reactRoot: ReactDOM.Root;
  const rootElement = getRootElement();
  reactRoot = ReactDOM.createRoot(rootElement!);
  reactRoot.render(<WidgetWrapper root={rootElement!} />);

  return () => reactRoot?.unmount?.();
};

document.addEventListener("DOMContentLoaded", initSnap);
