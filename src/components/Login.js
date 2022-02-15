import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { notBlank, validEmail } from "../helpers/Validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(true);
  const [submitMessage, setSubmitMessage] = useState(null);

  const navigate = useNavigate();

  function handleEmailChange(e) {
    let value = e.target.value;
    setEmail(value);

    if (!validEmail(value)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  }

  function handlePasswordChange(e) {
    let value = e.target.value;
    setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let blank_input = false;

    if (!notBlank(email) || !notBlank(password)) {
      blank_input = true;
    }

    if (blank_input) {
      setSubmitMessage("Inputs cannot be blank.");
      setSubmitResult(400);
      return;
    }

    setLoading("true");

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/users/login",
        {
          email: email,
          password: password
        }
      )
      .then((response) => {
        console.log(response);

        setLoading(false);
        setSubmitResult(response.status);
        setSubmitMessage("Log in successful!");

        localStorage.setItem("email", email);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("first", response.data.first);
        localStorage.setItem("last", response.data.last);

        navigate("/login-success", { replace: true });
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
        setSubmitResult("Error");
        setSubmitMessage("Log in failed!");
      });
  }

  function renderResult(message) {
    if (submitResult !== null) {
      if (submitResult === 200) {
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

  return (
    <div className="form-container">
      <div id="login-form">
        <h2 className="form-header">Log In</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
                error={invalidEmail}
                helperText={invalidEmail ? "Invalid email" : null}
                style={{ width: "300px", margin: "5px" }}
                type="text"
                value={email}
                onChange={(e) => handleEmailChange(e)}
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
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />
            </Grid>
            <Grid item>
              <Button
                id="submit-button"
                className="submit-button"
                variant="contained"
                disabled={invalidEmail ? true : false}
                style={{ margin: "5px" }}
                label="Submit"
                type="submit"
                onSubmit={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <div>{loading && <CircularProgress />}</div>
        {submitMessage && renderResult(submitMessage)}
        <div className="create-account-option">
          <h5 className="create-account-button">
            No account? Create one below
          </h5>
          <Link to="/create-account" style={{ textDecoration: "none" }}>
            <Button
              id="create-account-button"
              variant="outlined"
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
};

export default Login;
