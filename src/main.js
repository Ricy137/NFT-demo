import React from "react";
import ReactDOM from "react-dom";
import RouterObj from "./router";
import { AccountContextProvider } from "./context/account";
import "./styles/index.scss";
import "./styles/custom.scss";

const rootDom = document.getElementById("root");
ReactDOM.render(
  <AccountContextProvider>
    <RouterObj />
  </AccountContextProvider>,
  rootDom
);