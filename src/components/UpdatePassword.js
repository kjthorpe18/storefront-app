import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { notBlank, passwordsMatch } from "../helpers/Validation";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    // Don't update first, last, and email, but leaving them lets us update user endpoint
    this.state = {
      first: "",
      last: "",
      email: "",
      oldPassword: "",
      confirmOldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      newPasswordsMatch: true,
      oldPasswordsMatch: false,
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
          oldPassword: response.data.password,
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

    // State lags behind, so get the updated value
    let newPass = "";
    let confirmNewPass = "";

    if (name === "newPassword") {
      newPass = value;
      confirmNewPass = this.state.confirmNewPassword;
    } else if (name === "confirmNewPassword") {
      newPass = this.state.newPassword;
      confirmNewPass = value;
    }

    // Ensure new password and confirm new password match
    this.setState({
      newPasswordsMatch: passwordsMatch(newPass, confirmNewPass),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let blank_input = false;

    ["confirmOldPassword", "newPassword", "confirmNewPassword"].forEach(
      (item) => {
        if (!notBlank(this.state[item])) {
          blank_input = true;
        }
      }
    );

    if (blank_input) {
      this.setState({ submitMessage: "Inputs cannot be blank." });
      this.setState({ submitResult: 400 });
      return;
    }

    // Confirm old password is correct
    if (this.state.oldPassword != this.state.confirmOldPassword) {
      this.setState({ oldPasswordsMatch: false });
      this.setState({ submitResult: 400 });
      this.setState({ submitMessage: "Current password incorrect." });
      return;
    } else {
      this.setState({ oldPasswordsMatch: true });
    }

    this.setState({ loading: true });
    console.log(this.state);

    axios
      .put(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users",
        {
          email: this.state.email,
          password: this.state.newPassword,
          first: this.state.first,
          last: this.state.last,
        }
      )
      .then((response) => {
        this.setState({ loading: null });
        this.setState({ submitResult: response.status });
        this.setState({ submitMessage: "Password update successful!" });
      })
      .catch((error) => {
        console.log(error);

        this.setState({ loading: null });
        this.setState({ submitResult: "Error" });
        this.setState({ submitMessage: "Password update failed!" });
      });
  }

  renderResult(message) {
    if (this.state.submitResult != null) {
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
        <h2 className="form-header">Update Password</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            direction="column"
          >
            <Grid item>
              <TextField
                id="current-password-input"
                name="confirmOldPassword"
                label="Current Password"
                variant="outlined"
                style={{ width: "300px", margin: "5px" }}
                type="password"
                value={this.state.confirmOldPassword}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="new-password-input"
                name="newPassword"
                label="New Password"
                variant="outlined"
                error={this.state.newPasswordsMatch ? false : true}
                style={{ width: "300px", margin: "5px" }}
                type="password"
                value={this.state.newPassword}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="confirm-new-password-input"
                name="confirmNewPassword"
                label="Confirm New Password"
                variant="outlined"
                error={this.state.newPasswordsMatch ? false : true}
                style={{ width: "300px", margin: "5px" }}
                type="password"
                value={this.state.confirmNewPassword}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item>
              <Button
                id="update-button"
                className="update-button"
                variant="outlined"
                disabled={this.state.newPasswordsMatch ? false : true}
                style={{ margin: "5px" }}
                label="Update"
                type="submit"
              >
                Update
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

export default UpdatePassword;
