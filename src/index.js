import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./userContext";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
