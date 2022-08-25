
import React from "react";
import Landing from "../pages/simpleNft";
import SimpleNft from "../pages/simpleNft";

let RoutesTable = [
  {
    path: "/landing",
    name: "landing",
    component: <Landing />,
    lazy: true
  },
  {
    path: "/simplenft",
    name: "simpleNft",
    component: <SimpleNft />,
    lazy: true
  },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: <NotFound />,
  //   lazy: true
  // }
];

export default RoutesTable;
