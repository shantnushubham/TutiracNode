const { getWeatherByCoordinates } = require("./utils/forecast");
const { getCoordinatesByAddress } = require("./utils/geocode");

console.log("Starting my Weather App");

const getWeatherByAddress = (address) => {
  getCoordinatesByAddress(
    address,
    (error, { latitude, longitude, displayAddress }) => {
      if (error) {
        console.error(error);
      } else {
        getWeatherByCoordinates(
          latitude,
          longitude,
          (
            error,
            { temperature, windSpeed, windDirection, sky, weatherCondition }
          ) => {
            if (error) {
              console.error(error);
            } else {
              console.log(
                `The chosen address is ${displayAddress}, whose latitude is ${latitude} and longitude is ${longitude}
              The weather condition is:
              Temperature: ${temperature}
              Wind Speed: ${windSpeed}
              Wind Direction: ${windDirection}
              It is ${sky}-time and the condition is ${weatherCondition}.`
              );
            }
          }
        );
      }
    }
  );
};

getWeatherByAddress("Opera House, Sydney");

console.log("Ending my Weather App.");
