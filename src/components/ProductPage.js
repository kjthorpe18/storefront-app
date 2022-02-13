import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

const ProductPage = () => {
  const location = useLocation();
  const [email] = useState(localStorage.getItem("email"));
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  function renderResult(message) {
    if (submitResult !== null) {
      if (submitResult === 204) {
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

  function handleAddToCart(product) {
    console.log("Adding to cart: " + product);
    setLoading(true);

    axios
      .put(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/cart/add",
        {
          email: email,
          product: product
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        setSubmitResult(response.status);
        setSubmitMessage("Added to cart!");
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
        setSubmitResult("Error");
        setSubmitMessage("Failed to add to cart.");
      });
  }

  return (
    <div>
      <div className="product-content">
        <div className="center-item">
          <img
            className="product-image"
            alt="logo"
            src={require("../static/images/no-image-available.jpeg")}
          />
        </div>
        <div className="product-details">
          <div className="first-half">
            <Typography variant="h5" component="div">
              {location.state.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {location.state.brand}
            </Typography>
            <Typography variant="body3">
              {location.state.description}
            </Typography>
          </div>
          <div className="second-half">
            <Typography variant="h5">{location.state.price}</Typography>
            <div>
              <Button
                id="add-to-cart-button"
                className="add-to-cart-button"
                variant="outlined"
                style={{ width: "200px" }}
                label="Add to Cart"
                type="submit"
                onClick={() => handleAddToCart(location.state)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="submit-result">
        {loading && <CircularProgress />}
        {renderResult(submitMessage)}
      </div>
    </div>
  );
};

export default ProductPage;
