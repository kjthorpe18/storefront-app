import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./static/index.css";

import About from "./views/About";
import CreateProduct from "./views/CreateProduct";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="about" element={<About />} />
        <Route path="create-product" element={<CreateProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
