import React, { Component } from "react";
import axios from "axios";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const response =
    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products"
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        products: response.data
      })
  }

  render() {
    return (
      <div>
        {this.state.products}
      </div>
    );
  }
}

export default Products;
