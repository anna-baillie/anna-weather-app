let apiKey = "8o2ff7498032b5ae4f9bt64daad694e7";

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = response.data.temperature.current;
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let weatherDescription = document.querySelector("#weather-description");
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = `${response.data.city}`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  weatherDescription.innerHTML = response.data.condition.description;

  getForecast(response.data.city);
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div><img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temps">
              <div class="weather-forecast-temp"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

search("Nottingham");
