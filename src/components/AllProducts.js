import React, { Component } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products"
      )
      .then((response) => {
        this.setState({ products: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return this.state.loading ? (
      <div className="page-loading">
        <CircularProgress />
      </div>
    ) : (
      <div className="products">
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          align="center"
          columns={{ xs: 4, sm: 6, md: 12 }}
        >
          {this.state.products.map((item, index) => (
            <Grid item key={index} xs={2} sm={2} md={3}>
              <ProductCard data={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default AllProducts;
