const { Client } = require("@googlemaps/google-maps-services-js");
const googleMapClient = new Client({});

const getLatAndLng = async (address) => {
  // get latitude and longitude from a provided address.
  const coordinates = await googleMapClient
    .geocode({
      params: {
        key: process.env.GOOGLE_MAPS_GC_KEY,
        address,
      },
    })
    .then((resp) => {
      return resp.data.results[0].geometry.location;
    })
    .catch((err) => {
      next(err); // forward to the custom error handler.
    });
  return coordinates;
};

module.exports = {
  getLatAndLng,
};
