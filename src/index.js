import React from "react";
import ReactDOM from "react-dom";

import "./static/index.css";

import App from "./App";

// function requireAuth(nextState, replace, next) {
//   if (!authenticated) {
//     replace({
//       pathname: "/login",
//       state: {nextPathname: nextState.location.pathname}
//     });
//   }
//   next();
// }

// onEnter={requireAuth}


ReactDOM.render(
  <App />,
  document.getElementById("root")
);
