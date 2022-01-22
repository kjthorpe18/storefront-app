import React, { Component } from "react";
import Nav from "./Nav";

class Layout extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
