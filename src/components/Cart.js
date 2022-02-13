import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const [email] = useState(localStorage.getItem("email"));
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }

  return (
    <div>
      <h2 className="form-header">Your Cart</h2>
      <div>{loading && <CircularProgress />}</div>
      {!loading && (
        <div>
          {cart.map((item, index) => (
            <p key={index}>
              {item.name} {item.brand} {item.price} {item.productUUID}
            </p>
          ))}
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
        </div>
      )}
    </div>
  );
};

export default Cart;
