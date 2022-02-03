import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./static/index.css";

import App from "./App";
import CreateAccount from "./views/CreateAccount";
import Login from "./views/Login";
import About from "./views/About";
import CreateProduct from "./views/CreateProduct";
import Shop from "./views/Shop";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
