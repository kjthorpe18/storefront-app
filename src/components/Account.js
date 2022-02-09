import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

import axios from "axios";
import { notBlank, validEmail } from "../helpers/Validation";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first: "",
      last: "",
      invalidEmail: false,
      loading: null,
      submitResult: null,
      submitMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let email = localStorage.getItem("user");

    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users/?email=" +
          email
      )
      .then((response) => {
        this.setState({
          email: response.data.email,
          password: response.data.password,
          first: response.data.first,
          last: response.data.last,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
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

    ["email", "password", "first", "last"].forEach((item) => {
      if (!notBlank(this.state[item])) {
        blank_input = true;
      }
    });

    if (blank_input) {
      this.setState({ submitMessage: "Inputs cannot be blank." });
      this.setState({ submitResult: 400 });
      return;
    }

    this.setState({ loading: true });
    console.log(this.state);

    axios
      .put(
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
        this.setState({ submitMessage: "Account update successful!" });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
        this.setState({ submitMessage: "Account update failed!" });
      });
  }

  renderResult(message) {
    if (this.state.submitResult !== null) {
      if (this.state.submitResult === 204) {
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
      <div>
        <h2 className="form-header">Account</h2>
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
                error={this.state.invalidEmail ? true : false}
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
                label="password"
                variant="outlined"
                disabled
                InputProps={{readOnly: true}}
                InputLabelProps={{shrink: true}}
                style={{ width: "300px", margin: "5px" }}
                type="password"
                value={"**********"}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <Link to="/update-password" style={{ textDecoration: "none" }}>
                <Button
                  id="update-password-button"
                  className="update-password-button"
                  variant="outlined"
                  disabled={this.state.invalidEmail ? true : false}
                  style={{ margin: "5px" }}
                  label="Update Password"
                  type="submit"
                >
                  Update Password
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <TextField
                id="first-input"
                name="first"
                label="first"
                variant="outlined"
                style={{ width: "300px", margin: "5px" }}
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
                style={{ width: "300px", margin: "5px" }}
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
                disabled={this.state.invalidEmail ? true : false}
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

export default Account;
