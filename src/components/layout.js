import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="content">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
