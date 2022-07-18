const cityCountry = document.querySelector(".city-country");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const myLoc = document.querySelector(".myLoc");
const or = document.querySelector("#or");
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
const daysContainer = document.querySelector(".days-container");
const backArrow = document.querySelector("#back-arrow");
const loader = document.querySelector(".lds-roller");
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
  // const array = [...starterPage.children];
  // array.forEach((com) => com.classList.add("hidden"));
  loader.classList.add("hidden");

  starterPage.classList.add("hidden");
  // form.classList.remove("hidden");
  weatherPage.classList.remove("hidden");
  backArrow.classList.remove("hidden");
  cityCountry.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.trunc(data.main.temp)}°C`;
  weather.textContent = `${data.weather[0].main}`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
};
const displayForecast = function (data) {
  console.log(data);
  img.src = `${data.current.condition.icon}`;
  const length = data.forecast.forecastday.length;

  for (let i = 0; i <= length - 1; i++) {
    const date = new Date(data.forecast.forecastday[i].date);
    const month = date.getMonth();
    const day = date.getDate();
    const weekDay = date.getDay();
    let html = `<div class="day margin-1">
            <h2 class="day-date">${days[weekDay]}, ${months[month]} ${day}</h2>
            <div class="days-icon">
              <img src=https:${
                data.forecast.forecastday[i].day.condition.icon
              } class="forecast-icon" alt="" />
            </div>
            <div class="max-min">
              <h2 class="max">${Math.trunc(
                data.forecast.forecastday[i].day.maxtemp_c
              )}°,</h2>
              <h2 class="min">${Math.trunc(
                data.forecast.forecastday[i].day.mintemp_c
              )}°</h2>
            </div>
          </div>`;
    daysContainer.insertAdjacentHTML("beforeend", html);
  }
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
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=5362e219352f49e7941131801221207&q=${lat},${lng}&days=5&aqi=no&alerts=no
`)
          .then((res) => res.json())
          .then((data) => {
            displayForecast(data);
          })
          .catch((err) => console.log(err.message));
    },
    function () {
      console.log("could not get your location");
    }
  );
};
myLoc.addEventListener("click", function () {
  loader.classList.remove("hidden");
  getLocation();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(input.value);
  loader.classList.remove("hidden");
  const request2 = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        loader.classList.add("hidden");
        throw new Error("country not found");
      }

      return res.json();
    })
    .then((data) => {
      display(data);
    })
    .catch((err) => alert(err.message));

  const reqWeatherAPI2 =
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=5362e219352f49e7941131801221207&q=${input.value}&days=5&aqi=no&alerts=no
`)
      .then((res) => res.json())
      .then((data) => {
        displayForecast(data);
      })
      .catch((err) => console.log(err.message));
  input.value = "";
});
backArrow.addEventListener("click", function (e) {
  document.location.reload();
});
