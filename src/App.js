import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import CreateAccount from "./views/CreateAccount";
import Login from "./views/Login";
import About from "./views/About";
import CreateProduct from "./views/CreateProduct";
import Shop from "./views/Shop";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<About />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="shop" element={<Shop />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
