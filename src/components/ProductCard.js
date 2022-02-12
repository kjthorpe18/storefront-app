import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

class Layout extends Component {
  render() {
    return (
      <Box
        className="product-box"
        sx={{
          width: 300,
          height: 170,
          m: 1,
          "&:hover": {
            opacity: [0.8, 0.7, 0.6],
            boxShadow: 2
          }
        }}
      >
        <Link
          to={`/shop/${this.props.data.productUUID}`}
          state={{ name: this.props.data.name }}
          className="product-card-link"
          style={{ textDecoration: "none" }}
        >
          <Card className="product-card" variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {this.props.data.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {this.props.data.brand}
              </Typography>
              <Typography variant="body3">{this.props.data.price}</Typography>
              <br />
              <Typography variant="body2">
                {this.props.data.description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    );
  }
}

export default Layout;
