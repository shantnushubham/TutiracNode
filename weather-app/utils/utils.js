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

module.exports = { getWeatherTypeByCode };
