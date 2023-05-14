const { getWeatherByCoordinates, getCoordinatesByAddress } = require("./utils");

console.log("Starting my Weather App");

// getWeatherByCoordinates(22.56, 88.35);

getCoordinatesByAddress("Hitech City Metro Station");

console.log("Ending my Weather App.");
