import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const OrderPlaced = () => {
  return (
    <div>
      <h2>Order Placed!</h2>
      <p>Thank you for shopping with us!</p>
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <Button
          id="return-to-shop-button"
          className="return-to-shop-button"
          variant="contained"
          style={{ margin: "5px" }}
          label="Return to shop"
        >
          Return to shop
        </Button>
      </Link>
    </div>
  );
};

export default OrderPlaced;
