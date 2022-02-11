import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Account from "./components/Account";
import CreateAccount from "./views/CreateAccount";
import Login from "./views/Login";
import NoMatch from "./views/NoMatch";
import Home from "./components/Home";
import About from "./views/About";
import CreateProduct from "./views/CreateProduct";
import Shop from "./views/Shop";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="shop" element={<Shop />} />
        <Route path="account" element={<Account />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
