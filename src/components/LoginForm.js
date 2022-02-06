import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { notBlank, validEmail } from "../helpers/Validation";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      invalidEmail: false,
      loading: null,
      submitResult: null,
      submitMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });

    // Validate the input email if that's what changed
    if (name === "email") {
      if (!validEmail(value)) {
        this.setState({ invalidEmail: true });
      } else {
        this.setState({ invalidEmail: false });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Check that no inputs are blank
    let blank_input = false;

    ["email", "password"].forEach((item) => {
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

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users/login",
        {
          email: this.state.email,
          password: this.state.password,
        }
      )
      .then((response) => {
        console.log(response);

        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
        this.setState({ submitMessage: "Log in successful!" });

        // Store user info in browser
        localStorage.setItem("user", this.state.email);
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
        this.setState({ submitMessage: "Log in failed!" });
      });
  }

  renderResult(message) {
    if (this.state.submitResult != null) {
      if (this.state.submitResult === 200) {
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
      <div className="form" id="login-form">
        <h2 className="form-header">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            direction="column"
          >
            <Grid item>
              {this.state.invalidEmail ? (
                <TextField
                  id="email-input"
                  name="email"
                  label="email"
                  variant="outlined"
                  error
                  helperText="Invalid email"
                  style={{ width: "200px", margin: "5px" }}
                  type="text"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              ) : (
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
              )}
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

export default LoginForm;
