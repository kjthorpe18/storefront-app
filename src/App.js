import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Account from "./components/Account";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import NoMatch from "./views/NoMatch";
import Home from "./components/Home";
import LoginRedirect from "./components/LoginRedirect";
import About from "./views/About";
import OrderPlaced from "./views/OrderPlaced";
import CreateProduct from "./components/CreateProduct";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";
import Categories from "./components/Categories";

import Shop from "./views/Shop";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  return (
    <Routes>
      <Route exact path="/login-success" element={<LoginRedirect />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="categories" element={<Categories />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:productUUID" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="order-success" element={<OrderPlaced />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
