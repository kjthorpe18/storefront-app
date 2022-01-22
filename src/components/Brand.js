import React, { Component } from "react";

class Brand extends Component {
  render() {
    return (
      <img
        id="logo"
        className="nav-item"
        alt="logo"
        src={require("../static/" + this.props.logo)}
      />
    );
  }
}

export default Brand;
