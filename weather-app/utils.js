const axios = require("axios");

const weatherCodeMap = new Map();
weatherCodeMap.set(0, "Clear Sky");
weatherCodeMap.set(1, "Mainly Clear");
weatherCodeMap.set(2, "Partly Cloudy");
weatherCodeMap.set(3, "Overcast");
weatherCodeMap.set(45, "Fog");
weatherCodeMap.set(48, "Depositing Rime Fog");
weatherCodeMap.set(51, "Drizzle: Light");
weatherCodeMap.set(53, "Drizzle: Moderate");
weatherCodeMap.set(55, "Drizzle: Heavy");
weatherCodeMap.set(56, "Freezing Drizzle: Light");
weatherCodeMap.set(57, "Freezing Drizzle: Heavy");
weatherCodeMap.set(61, "Rain: Light");
weatherCodeMap.set(63, "Rain: Moderate");
weatherCodeMap.set(65, "Rain: Heavy");
weatherCodeMap.set(66, "Freezing Rain: Light");
weatherCodeMap.set(67, "Freezing Rain: Heavy");
weatherCodeMap.set(71, "Snow: Light");
weatherCodeMap.set(73, "Snow: Moderate");
weatherCodeMap.set(75, "Snow: Heavy");
weatherCodeMap.set(77, "Snow Grains");
weatherCodeMap.set(80, "Rain Showers: Light");
weatherCodeMap.set(81, "Rain Showers: Moderate");
weatherCodeMap.set(82, "Rain Showers: Heavy");
weatherCodeMap.set(85, "Snow Showers: Light");
weatherCodeMap.set(86, "Snow Showers: Heavy");
weatherCodeMap.set(95, "Thunderstorm");
weatherCodeMap.set(96, "Thunderstorm with Hail");

function getWeatherTypeByCode(code) {
  return weatherCodeMap.get(code);
}

const METEO_URL = "https://api.open-meteo.com/v1/forecast";

const GEOCODE_URL = "https://geocode.maps.co/search";

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

module.exports = { getWeatherByCoordinates, getCoordinatesByAddress };
