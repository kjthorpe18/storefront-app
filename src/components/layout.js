import React, { Component } from "react";
import Nav from './nav';

class Layout extends Component {
    render() {
        return(
            <div >
                <Nav />
                <div className="content">
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}

export default Layout;
