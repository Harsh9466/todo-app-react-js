import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FluentProvider theme={teamsLightTheme}>
    {/*  <React.StrictMode> */}
    <App />
    {/*  </React.StrictMode> */}
  </FluentProvider>
);
