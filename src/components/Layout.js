import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <div className="everything">
        <div className="nav">
          <Nav />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default Layout;
