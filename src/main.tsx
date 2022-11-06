import React from "react";
import ReactDOM from "react-dom/client";
import RouterObj from "./router";
import { AccountContextProvider } from "./context/account";
import "./styles/index.scss";
import "./styles/custom.scss";
import 'uno.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AccountContextProvider>
    <RouterObj />
  </AccountContextProvider>
);