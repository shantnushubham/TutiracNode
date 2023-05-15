const axios = require("axios");
const { getWeatherTypeByCode } = require("./utils");

const METEO_URL = "https://api.open-meteo.com/v1/forecast";

const getWeatherByCoordinates = (latitude, longitude, callback) => {
  axios
    .get(METEO_URL, {
      params: {
        latitude,
        longitude,
        daily: ["temperature_2m_max", "temperature_2m_min", "weathercode"],
        current_weather: true,
        timezone: "IST",
        start_date: "2023-05-15",
        end_date: "2023-05-25",
      },
    })
    .then(
      ({
        data: {
          current_weather: {
            temperature,
            windspeed: windSpeed,
            winddirection: windDirection,
            is_day: isDay,
            weathercode: weatherCode,
          },
        },
      }) => {
        callback(undefined, {
          temperature: `${temperature} ºC`,
          windSpeed: `${windSpeed} km/h`,
          windDirection: `${windDirection}º`,
          sky: isDay === 1 ? "Day" : "Night",
          weatherCondition: getWeatherTypeByCode(weatherCode),
        });
      }
    )
    .catch((err) => {
      if (err.response) {
        callback(err.response.data.reason, undefined);
      } else {
        callback("Please check your connection.", undefined);
      }
    });
};

module.exports = { getWeatherByCoordinates };
