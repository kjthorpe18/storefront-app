import React, { Component } from "react";
import Brand from "./Brand";
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
import { Link } from 'react-router-dom';

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
      case "Categories":
        return <CategoryIcon />;
      case "About Us":
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  }

  linkFromPage(page) {
    switch (page) {
      case "Home":
        return "/";
      case "Categories":
        return "/categories";
      case "About Us":
        return "/about";
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
          {["Home", "Categories", "About Us"].map((key, index) => (
            <ListItem button key={key} component={Link} to={this.linkFromPage(key)}>
              <ListItemIcon>{this.iconRender(key)}</ListItemIcon>
              <ListItemText primary={key} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  render() {
    return (
      <nav id="navbar" className='sticky-top'>
        <Brand
          brandName="StoreFront"
          logo="logo-example.png"
          id="brand"
          className="nav-item"
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
