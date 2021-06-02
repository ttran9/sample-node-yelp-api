const yelp = require("yelp-fusion");
const yelpClient = yelp.client(process.env.YELP_KEY);

const performSearch = async (term, lat, lng, numResults = 10) => {
  // perform a yelp business search defaulting to 10 searches unless overriden.
  const businesses = await yelpClient
    .search({
      term,
      latitude: lat,
      longitude: lng,
      limit: numResults,
    })
    .then((response) => {
      return response.jsonBody.businesses;
    })
    .catch((err) => {
      next(err); // forward to the custom error handler.
    });
  return businesses;
};

module.exports = {
  performSearch,
};
