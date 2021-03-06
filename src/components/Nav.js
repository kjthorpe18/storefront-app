import React, { Component } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

import { userLoggedIn, logOutUser } from "../helpers/Authentication";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { right: false };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(open) {
    this.setState({
      right: open
    });
  }

  iconRender(type) {
    switch (type) {
      case "Home":
        return <HomeIcon />;
      case "About Us":
        return <InfoIcon />;
      case "Create Product":
        return <AddIcon />;
      case "Categories":
        return <CategoryIcon />;
      case "Shop":
        return <ShoppingCartIcon />;
      default:
        return <InfoIcon />;
    }
  }

  linkFromPage(page) {
    switch (page) {
      case "Home":
        return "/";
      case "About Us":
        return "/about";
      case "Create Product":
        return "/create-product";
      case "Categories":
        return "/categories";
      case "Shop":
        return "/shop";
      default:
        return "/";
    }
  }

  menuList() {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => this.toggleDrawer(false)}
        onKeyDown={() => this.toggleDrawer(false)}
      >
        <List>
          {["Home", "Shop", "Categories", "Create Product", "About Us"].map(
            (key, index) => (
              <ListItem
                button
                key={key}
                component={Link}
                to={this.linkFromPage(key)}
              >
                <ListItemIcon>{this.iconRender(key)}</ListItemIcon>
                <ListItemText primary={key} />
              </ListItem>
            )
          )}
          {userLoggedIn() && (
            <ListItem
              button
              key={"Log Out"}
              component={Link}
              to={"/home"}
              onClick={() => logOutUser(false)}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItem>
          )}
        </List>
      </Box>
    );
  }

  render() {
    return (
      <nav id="navbar">
        <div id="logo" className="nav-item">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img
              id="logo"
              className="logo-image"
              alt="logo"
              src={require("../static/images/draft-logo-blue.png")}
            />
          </Link>
        </div>

        <div id="navbar-flexbox" className="nav-item">
          {userLoggedIn() && (
            <div id="cart" className="nav-item navbar-flexbox-item">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button id="user-button">
                  <ShoppingCartIcon fontSize="medium" />
                </Button>
              </Link>
            </div>
          )}

          {userLoggedIn() ? (
            <div id="user" className="nav-item navbar-flexbox-item">
              <Link to="/account" style={{ textDecoration: "none" }}>
                <Button id="user-button">
                  <PersonIcon fontSize="medium" />
                </Button>
              </Link>
            </div>
          ) : (
            <div id="user" className="nav-item navbar-flexbox-item">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button id="user-button">{"Log In / Register"}</Button>
              </Link>
            </div>
          )}

          <div id="menu" className="nav-item navbar-flexbox-item">
            <Button id="menu-button" onClick={() => this.toggleDrawer(true)}>
              {"Menu"}
            </Button>
          </div>
        </div>

        <Drawer
          id="menu-drawer"
          anchor={"right"}
          open={this.state.right}
          onClose={() => this.toggleDrawer(false)}
        >
          {this.menuList()}
        </Drawer>
      </nav>
    );
  }
}

export default Nav;
