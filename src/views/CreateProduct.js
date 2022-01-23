import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const defaultValues = {
  name: "",
  brand: "",
  price: "",
  category: "",
};

const CreateProduct = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://gl6q2jonld.execute-api.us-east-2.amazonaws.com/products", {
        name: formValues.name,
        brand: formValues.brand,
        price: formValues.price,
        category: formValues.category,
        productId: 4325326,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="space-between"
        direction="column"
      >
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="name"
            variant="outlined"
            style={{ width: "200px", margin: "5px" }}
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="brand-input"
            name="brand"
            label="brand"
            variant="outlined"
            style={{ width: "200px", margin: "5px" }}
            type="text"
            value={formValues.brand}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="price-input"
            name="price"
            label="price"
            variant="outlined"
            style={{ width: "200px", margin: "5px" }}
            type="text"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="category-input"
            name="category"
            label="category"
            variant="outlined"
            style={{ width: "200px", margin: "5px" }}
            type="text"
            value={formValues.category}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProduct;
