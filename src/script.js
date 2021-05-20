let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//let currentTime = new Date();
//let currentDay = days[currentTime.getDay()];
//let hours = currentTime.getHours();
//let minutes = currentTime.getMinutes();

//let displayTime = document.querySelector("#displayTime");
//displayTime.innerHTML = `${currentDay}, ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="row"> 
       <div class="col-5">
        <div class="days" class="weather-forecast-date"> ${formatDay(
          forecastDay.dt
        )} </div>
        
       </div>
         <span class="col-5"> <img id="icon" class="col-5" src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" width=60px; s s></img>  </span>
         <span class="col-1" class="weather-forcast-temp-max">${Math.round(
           forecastDay.temp.max
         )}º </span>
          <span class="col-1" class="weather-forcast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}º</span> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "95322a94bc8878b37c06b9562667a92f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${temperature}ºC`;
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "95322a94bc8878b37c06b9562667a92f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function currentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-location");
  currentTemp.innerHTML = `${temperature}ºC`;
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "95322a94bc8878b37c06b9562667a92f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

search("London");
