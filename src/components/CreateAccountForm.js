import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import axios from "axios";

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first: "",
      last: "",
      password: "",
      submitResult: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users",
        {
          email: this.state.email,
          password: this.state.password,
          first: this.state.first,
          last: this.state.last
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

  renderResult() {
    if (this.state.submitResult != null) {
      if (this.state.submitResult == 200) {
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Account created successfully!
          </Alert>
        );
      }
      else {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Account creation failed!
          </Alert>
        );
      }
    }
  };

  render() {
    return (
      <div id="create-account-form">
        <h2 className="form-header">Create an Account</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            direction="column"
          >
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                label="email"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-input"
                name="password"
                label="password"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="first-input"
                name="first"
                label="first"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.first}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="last-input"
                name="last"
                label="last"
                variant="outlined"
                style={{ width: "200px", margin: "5px" }}
                type="text"
                value={this.state.last}
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
        {this.renderResult()}
      </div>
    );
  }
}

export default CreateAccountForm;
