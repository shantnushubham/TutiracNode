const baseUrl = "http://localhost:8080/weather?address=Hyderabad";

const getWeather = () => {
  fetch(baseUrl)
    .then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

getWeather();
