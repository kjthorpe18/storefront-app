import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

const Home = () => {
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

        getRandomItems(response.data);
        getRecentItems(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  function getRecentItems(items) {
    // Get 5 most recent items. Should be done by query, but whatever
    let recents = [];
    recents.push(items[0]);
    let count = 1;

    items.map((item, index) => {
      if (count < 5) {
        recents.push(item);
        count++;
      } else {
        // find oldest item in recents
        let oldest = recents[0];
        let date = oldest.date;
        let i = 0;

        for (let x = 1; x < recents.length; x++) {
          if (date > recents[x]) {
            oldest = recents[x];
            date = oldest.date;
            i = x;
          }
        }

        // Replace it if item is newer
        if (item.dateAdded > oldest.dateAdded) {
          recents[i] = item;
        }
      }

      return recents;
    });

    setRecentItems(recents);
  }

  function getRandomItems(items) {
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
