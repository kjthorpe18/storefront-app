import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

const Home = () => {
  // const [allItems, setAllItems] = useState([]);
  const [randomItems, setRandomItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://fvvd85s1e4.execute-api.us-east-2.amazonaws.com/test/products"
      )
      .then((response) => {
        setLoading(false);

        let sorted = response.data.sort(function (a, b) {
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        });

        // setAllItems(sorted)

        getAndSetRandomItems(sorted);
        getAndSetRecentItems(sorted);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  function getAndSetRecentItems(items) {
    let recents = items.slice(0, 5);

    setRecentItems(recents);
  }

  function getAndSetRandomItems(items) {
    let randoms = [];

    for (let x = 0; x < 5; x++) {
      let item = items[Math.floor(Math.random() * items.length)];
      randoms.push(item);
    }

    setRandomItems(randoms);
  }

  return (
    <div id="home-page">
      <h2>Home</h2>
      {loading && <CircularProgress />}
      <div>
        <h3>Random Items</h3>
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          align="center"
          columns={{ xs: 4, sm: 6, md: 12 }}
        >
          {randomItems.map((item, index) => (
            <Grid item key={index}>
              <ProductCard data={item} />
            </Grid>
          ))}
        </Grid>
        <div>
          <h3>Recent Items</h3>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            align="center"
            columns={{ xs: 4, sm: 6, md: 12 }}
          >
            {recentItems.map((item, index) => (
              <Grid item key={index}>
                <ProductCard data={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
