const cityCountry = document.querySelector(".city-country");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const myLoc = document.querySelector(".myLoc");

const form = document.querySelector("form");
const input = document.querySelector("#input");
const body = document.querySelector("body");
const starterPage = document.querySelector(".starter");
const weatherPage = document.querySelector(".weather-page");
const windSpeed = document.querySelector(".wind-speed");
const max = document.querySelector(".max");
const min = document.querySelector(".min");
const img = document.querySelector(".weather-icon");
const forecastIcon = document.querySelector(".forecast-icon");
const dayDate = document.querySelector(".day-date");
const key = "116d68080960d3de10121bb1c22de76d";
const days = ["sun", "mon", "tue", "wed", "Thur", "fri", "sat"];
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "Jul",
  "Aug",
  "sep",
  "nov",
  "dec",
];
const display = function (data) {
  console.log(data);
  starterPage.classList.add("hidden");
  weatherPage.classList.remove("hidden");
  cityCountry.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.trunc(data.main.temp)}°C`;
  weather.textContent = `${data.weather[0].main}`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  // img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
};
const displayForecast = function (data) {
  console.log(data);
  img.src = `${data.current.condition.icon}`;
  max.textContent = `${Math.trunc(
    data.forecast.forecastday[0].day.maxtemp_c
  )}°,`;
  min.textContent = `${Math.trunc(
    data.forecast.forecastday[0].day.mintemp_c
  )}°`;
  forecastIcon.src = `https:${data.forecast.forecastday[0].day.condition.icon}`;
  const date = new Date(data.forecast.forecastday[0].date);
  const month = date.getMonth();
  const day = date.getDate();
  const weekDay = date.getDay();
  console.log(weekDay);
  console.log(day);
  console.log(month);
  dayDate.textContent = `${days[weekDay]}, ${months[month]} ${day}`;
};
const getLocation = function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      const lat = position.coords.latitude;
      // console.log(lat);
      const lng = position.coords.longitude;
      // console.log(lng);

      const request = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          display(data);
        })
        .catch((err) => console.log(err.message));

      const reqWeatherAPI =
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5362e219352f49e7941131801221207&q=${lat},${lng}&days=5&aqi=no&alerts=no
`)
          .then((res) => res.json())
          .then((data) => {
            displayForecast(data);
          });
    },
    function () {
      console.log("could not get your location");
    }
  );
};
myLoc.addEventListener("click", function () {
  getLocation();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(input.value);
  const request2 = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      display(data);
    })
    .catch((err) => console.log(err.message));
  const reqWeatherAPI2 =
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=5362e219352f49e7941131801221207&q=${input.value}&days=5&aqi=no&alerts=no
`)
      .then((res) => res.json())
      .then((data) => {
        displayForecast(data);
      });
});
