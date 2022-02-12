import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProductPage = () => {
  const location = useLocation();
  return (
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
          <Typography variant="body3">{location.state.description}</Typography>
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
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
