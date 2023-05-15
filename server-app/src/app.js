const express = require("express");
const cors = require("cors");
const { getCoordinatesByAddress } = require("./utils/geocode");
const { getWeatherByCoordinates } = require("./utils/forecast");

const app = express();

app.use(cors());

const getWeatherByAddress = (address, callback) => {
  getCoordinatesByAddress(address, (error, coordinates) => {
    if (error) {
      callback({ message: error });
      console.error(error);
    } else {
      const { latitude, longitude } = coordinates;
      getWeatherByCoordinates(latitude, longitude, (error, weatherInfo) => {
        if (error) {
          callback({ message: error });
        } else {
          callback(undefined, weatherInfo);
        }
      });
    }
  });
};

// www.tutorac.com
// 1. "At Home Page" -> "hello Tutorac"
// 2. "/contact" -> "This is contact page"
// 3. "/about" -> "This is about page."

app.get("", (req, res) => {
  return res.send("Hello Tutorac.");
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  getWeatherByAddress(address, (error, weatherInfo) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(weatherInfo);
    }
  });
});

app.get("/contact", (req, res) => {
  return res.send("This is contact page.");
});

app.get("/about", (req, res) => {
  return res.send("This is about page.");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("This is our first express app and it is running.");
});
