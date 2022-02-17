import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import { notBlank } from "../helpers/Validation";

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      brand: "",
      price: "",
      category: "",
      description: "",
      // imageFile: null,
      // imagePreview: null,
      loading: null,
      submitResult: null,
      submitMessage: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleFileChange(e) {
  //   console.log("new file uploaded");

  //   let url = URL.createObjectURL(e.target.files[0]);

  //   console.log(url);
  //   this.setState({
  //     imagePreview: url,
  //     imageFile: e.target.files[0]
  //   });
  // }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let blank_input = false;

    ["name", "brand", "price", "category", "description"].forEach((item) => {
      if (!notBlank(this.state[item])) {
        blank_input = true;
      }
    });

    if (blank_input) {
      this.setState({ submitMessage: "Inputs cannot be blank." });
      this.setState({ submitResult: 400 });
      return;
    }

    this.setState({ loading: "true" });

    const date = new Date().toISOString();

    // const formData = new FormData();
    // formData.append("file", this.state.imageFile);
    // formData.append("name", this.state.name);
    // formData.append("brand", this.state.brand);
    // formData.append("price", this.state.price);
    // formData.append("category", this.state.category);
    // formData.append("description", this.state.description);
    // formData.append("dateAdded", date);

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products",
        {
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          category: this.state.category,
          description: this.state.description,
          dateAdded: date
        }
      )
      .then((response) => {
        console.log(response);

        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
        this.setState({ submitMessage: "Product creation successful!" });

        this.setState({
          name: "",
          brand: "",
          price: "",
          category: "",
          description: ""
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
        this.setState({ submitMessage: "Product creation failed!" });
      });
  }

  renderResult(message) {
    if (this.state.submitResult !== null) {
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
      <div className="form-container">
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
                  label="Name"
                  variant="outlined"
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="brand-input"
                  name="brand"
                  label="Brand"
                  variant="outlined"
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.brand}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="price-input"
                  name="price"
                  label="Price"
                  variant="outlined"
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="category-input"
                  name="category"
                  label="Category"
                  variant="outlined"
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="description-input"
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline={true}
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </Grid>
              {/* <Grid item>
                <Button
                  variant="outlined"
                  component="label"
                  fontSize="small"
                  style={{ fontSize: "12px", margin: "5px" }}
                >
                  Upload Product Image
                  <input type="file" onChange={this.handleFileChange} hidden />
                </Button>
                <p className="image-feedback">
                  {this.state.imageFile !== null &&
                    "File: " + this.state.imageFile.name}
                </p>
              </Grid> */}
              <Grid item>
                <Button
                  id="submit-button"
                  className="submit-button"
                  variant="contained"
                  style={{ margin: "5px" }}
                  label="Submit"
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
      </div>
    );
  }
}

export default CreateProduct;
