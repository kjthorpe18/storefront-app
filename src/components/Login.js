import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { notBlank, validEmail } from "../helpers/Validation";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      invalidEmail: false,
      loading: null,
      submitResult: null,
      submitMessage: ""
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
          password: this.state.password
        }
      )
      .then((response) => {
        console.log(response);

        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
        this.setState({ submitMessage: "Log in successful!" });

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
    if (this.state.submitResult !== null) {
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
      <div className="form-container">
        <div id="login-form">
          <h2 className="form-header">Login</h2>
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
                  label="Email"
                  variant="outlined"
                  error={this.state.invalidEmail}
                  helperText={this.state.invalidEmail ? "Invalid email" : null}
                  style={{ width: "300px", margin: "5px" }}
                  type="text"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="password-input"
                  name="password"
                  label="Password"
                  variant="outlined"
                  style={{ width: "300px", margin: "5px" }}
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </Grid>
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
          <div className="create-account-option">
            <h5 className="create-account-button">
              No account? Create one below
            </h5>
            <Link to="/create-account" style={{ textDecoration: "none" }}>
              <Button
                id="create-account-button"
                variant="outlined"
                disabled={this.state.invalidEmail ? true : false}
                style={{ margin: "5px" }}
                label="Create Account"
                type="submit"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;