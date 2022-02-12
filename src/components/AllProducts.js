import React, { Component } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products"
      )
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="products">
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {this.state.products.map((item, index) => (
            <Grid item key={index} xs={2} sm={4} md={4}>
              <ProductCard data={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default AllProducts;
