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
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}: ${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  
  days.forEach(function(day) {

    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day} </div>
        <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/091/953/original/cloud_2391401.png?1691010175"
          alt=""
          width="42px"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">18°</span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
        </div>
`;
    
  })
  
forecastHTML = forecastHTML+` </div>`;
forecastElement.innerHTML =forecastHTML;
console.log(forecastHTML);
}

function getForecast(coordinates) {
 console.log(coordinates) ;
 let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metrics`;
 axios.get(apiUrl).then(displayForecast);
 
 console.log(apiUrl);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement= document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon")
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

   getForecast(response.data.coord)
}

function search(city) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("Cape Town");


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

