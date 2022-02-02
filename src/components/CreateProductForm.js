import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

class CreateProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      brand: "",
      price: "",
      category: "",
      submitResult: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products",
        {
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          category: this.state.category
        }
      )
      .then((response) => {
        console.log(response.status);

        this.setState({submitResult: response.status});
      })
      .catch((error) => {
        console.log(error);
        this.setState({submitResult: "Error"});
      });
  };

  render() {
    return (
      <div id="create-product-form">
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
        {this.state.submitResult &&
          <h2>{this.state.submitResult}</h2>
        }
      </div>
    );
  }
}

export default CreateProductForm;
