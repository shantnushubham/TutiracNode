const axios = require("axios");

const GEOCODE_URL = "https://geocode.maps.co/search";

const getCoordinatesByAddress = (address, callback) => {
  axios
    .get(GEOCODE_URL, {
      params: {
        q: address,
      },
    })
    .then(({ data }) => {
      if (data.length) {
        data = data[0];
        callback(undefined, {
          latitude: data.lat,
          longitude: data.lon,
          displayAddress: data.display_name,
        });
      } else {
        console.error(
          "The location cannot be translated into coordinates, please try some other location."
        );
      }
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data.reason, undefined);
      } else {
        callback("Please check your connection.", undefined);
      }
    });
};

module.exports = { getCoordinatesByAddress };
