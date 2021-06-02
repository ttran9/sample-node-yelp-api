// bring in express
const express = require("express");
const router = express.Router();
const axios = require("axios");
axios.defaults.baseURL = "https://api.yelp.com/v3/businesses/search";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + process.env.YELP_KEY;

const geocoder = require("../middleware/geocoder");
const yelp = require("../middleware/yelpsearch");

router.post(
  "/search",
  (caller = async (req, res, next) => {
    // router.post("/search", async = (req, res, next) => {
    const { body } = req;
    const { address, term } = body;
    try {
      // get latitude and longitude.
      const geoResponse = await geocoder.getLatAndLng(address);
      const { lat, lng } = geoResponse;
      // create the yelp search.
      const businesses = await yelp.performSearch(term, lat, lng);
      res.send(businesses);
    } catch (error) {
      next(error); // forward to the custom error handler.
    }
  })
);

module.exports = router;
