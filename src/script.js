let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = new Date();
let currentDay = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let displayTime = document.querySelector("#displayTime");
displayTime.innerHTML = `${currentDay}, ${hours}:${minutes}`;

function showTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  //let time =
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let temperatureDescription = document.querySelector("#tempDescription");
  temperatureElement.innerHTML = `${temperature}ºC`;
  cityElement.innerHTML = city;
  temperatureDescription.innerHTML = description;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  let apiKey = "95322a94bc8878b37c06b9562667a92f";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
