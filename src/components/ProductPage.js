import React from "react";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      {location.state.name}
      <br />
      {location.state.brand}
      <br />
      {location.state.price}
    </div>
  );
};

export default ProductPage;
