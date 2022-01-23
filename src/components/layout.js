import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <div className="everything">
        <Nav className="nav" />
        <div className="content">
          <Outlet />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default Layout;
