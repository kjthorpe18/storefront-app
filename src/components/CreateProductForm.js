import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import { notBlank } from "../helpers/Helpers";

class CreateProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      brand: "",
      price: "",
      category: "",
      loading: null,
      submitResult: null,
      submitMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Check that no inputs are blank
    let blank_input = false;

    ["name", "brand", "price", "category"].forEach((item) => {
      if (!notBlank(this.state[item])) {
        blank_input = true;
      }
    });

    if (blank_input) {
      this.setState({ submitMessage: "Inputs cannot be blank." });
      this.setState({ submitResult: 400 });
      return;
    }

    // No blank inputs, make the request
    this.setState({ loading: "true" });

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products",
        {
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          category: this.state.category,
        }
      )
      .then((response) => {
        console.log(response.status);

        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
        this.setState({ submitMessage: "Product creation successful!" });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
        this.setState({ submitMessage: "Product creation failed!" });
      });
  }

  renderResult(message) {
    if (this.state.submitResult != null) {
      if (this.state.submitResult === 201) {
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        );
      } else {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        );
      }
    }
  }

  render() {
    return (
      <div id="create-product-form">
        <h2 className="form-header">Create a Product</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            direction="column"
          >
            <Grid item>
              <TextField
                id="name-input"
                name="name"
                label="name"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="brand-input"
                name="brand"
                label="brand"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.brand}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="price-input"
                name="price"
                label="price"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="category-input"
                name="category"
                label="category"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.category}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <Button
                id="submit-button"
                className="submit-button"
                variant="outlined"
                style={{ margin: "5px" }}
                label="submit"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <div>{this.state.loading && <CircularProgress />}</div>
        {this.renderResult(this.state.submitMessage)}
      </div>
    );
  }
}

export default CreateProductForm;
