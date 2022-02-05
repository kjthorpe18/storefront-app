import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first: "",
      last: "",
      password: "",
      invalidEmail: false,
      loading: null,
      submitResult: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validEmail(email) {
    let result = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (result === null) return false;
    else return true;
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });

    // Validate the input email if that's what changed
    if (name == "email") {
      if (!this.validEmail(value)) {
        this.setState({ invalidEmail: true });
      } else {
        this.setState({ invalidEmail: false });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users",
        {
          email: this.state.email,
          password: this.state.password,
          first: this.state.first,
          last: this.state.last,
        }
      )
      .then((response) => {
        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
      });
  }

  renderResult() {
    if (this.state.submitResult != null) {
      if (this.state.submitResult === 201) {
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Account created successfully!
          </Alert>
        );
      } else {
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Account creation failed!
          </Alert>
        );
      }
    }
  }

  render() {
    return (
      <div className="form" id="create-account-form">
        <h2 className="form-header">Create an Account</h2>
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
              {this.state.invalidEmail ? (
                <Button
                  id="submit-button"
                  className="submit-button"
                  variant="outlined"
                  disabled
                  style={{ margin: "5px" }}
                  label="submit"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
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
              )}
            </Grid>
          </Grid>
        </form>
        <div>{this.state.loading && <CircularProgress />}</div>
        {this.renderResult()}
      </div>
    );
  }
}

export default CreateAccountForm;