import React, { Component } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

class Nav extends Component {

    constructor(props)
    {
        super(props);
        this.state = { right : false };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(open) {
        this.setState({
            right: open
        });
    }
    
    list() {
        return(
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => this.toggleDrawer(false)}
              onKeyDown={() => this.toggleDrawer(false)}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
        );
    }

    render() {
        return (
            <nav id='navbar'>
                <Button className='nav-item' id='menu' onClick={() => this.toggleDrawer(true)}>{'Menu'}</Button>
                <Drawer
                    anchor={'right'}
                    open={this.state.right}
                    onClose={() => this.toggleDrawer(false)}
                >
                    {this.list()}
                </Drawer>
            </nav>
        );
    }
}

export default Nav;