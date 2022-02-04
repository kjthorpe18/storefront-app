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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { right: false };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(open) {
    this.setState({
      right: open,
    });
  }

  iconRender(type) {
    switch (type) {
      case "Home":
        return <HomeIcon />;
      case "Create Account":
        return <PersonAddIcon />;
      case "Log In":
        return <LoginIcon />;
      case "About Us":
        return <InfoIcon />;
      case "Create Product":
        return <AddIcon />;
      case "Categories":
        return <CategoryIcon />;
      default:
        return <InfoIcon />;
    }
  }

  linkFromPage(page) {
    switch (page) {
      case "Home":
        return "/";
      case "Create Account":
        return "/create-account";
      case "Log In":
        return "/login";
      case "About Us":
        return "/about";
      case "Create Product":
        return "/create-product";
      case "Categories":
        return "/categories";
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
          {["Home", "Create Account", "Log In", "Categories", "Create Product", "About Us"].map(
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
        </List>
      </Box>
    );
  }

  render() {
    return (
      <nav id="navbar" className="sticky-top">
        <img
          id="logo"
          className="nav-item"
          alt="logo"
          src={require("../static/logo-example.png")}
        />
        <div id="menu" className="nav-item">
          <Button id="menu-button" onClick={() => this.toggleDrawer(true)}>
            {"Menu"}
          </Button>
        </div>
        <Drawer
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
