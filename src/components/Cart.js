import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CartList from "./CartList";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [email] = useState(localStorage.getItem("email"));
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attemptingCheckout, setAttemptingCheckout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/cart/?email=" +
          email
      )
      .then((response) => {
        console.log(response);
        setLoading(false);

        response.data.cart !== null ? setCart(response.data.cart) : setCart([]);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [email]);

  function handleCheckout() {
    setAttemptingCheckout(true);

    axios
      .post(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/cart/checkout",
        {
          email: email,
          cart: cart
        }
      )
      .then((response) => {
        console.log(response);

        setAttemptingCheckout(false);
        navigate("/order-success");
      })
      .catch((error) => {
        console.log(error);
        setAttemptingCheckout(false);
      });
  }

  return (
    <div>
      <h2 className="form-header">Your Cart</h2>
      <div>{loading && <CircularProgress />}</div>
      {!loading && (
        <div>
          <CartList items={cart} />
          <Button
            id="checkout-button"
            className="checkout-button"
            variant="outlined"
            style={{ width: "200px" }}
            label="Checkout"
            type="submit"
            onClick={() => handleCheckout()}
          >
            Checkout
          </Button>
          <div>{attemptingCheckout && <CircularProgress />}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
