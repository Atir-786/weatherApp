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

const key = "116d68080960d3de10121bb1c22de76d";
const display = function (data) {
  console.log(data);
  starterPage.classList.add("hidden");
  weatherPage.classList.remove("hidden");
  cityCountry.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.trunc(data.main.temp)}°C`;
  weather.textContent = `${data.weather[0].main}`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
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
        });
      const reqDays = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${key}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          max.textContent = `${Math.trunc(data.list[0].main.temp_max)}°`;
          min.textContent = `${Math.trunc(data.list[0].main.temp_min)}°`;
          const date = new Date(data.list[0].dt);
          console.log(date);
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
    });
});
