import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="footer-column">
          <h4 className="footer-column-header">Help</h4>
          <ul className="footer-list">
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/returns">Returns</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-column-header">Account</h4>
          <ul className="footer-list">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/create-account">Register</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-column-header">Pages</h4>
          <ul className="footer-list">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
