// var userFormEl = document.querySelector('#user-form');
// var nameInput = document.querySelector('#username');

// use fetch to get the openweathe api url


var apiKey = 'a8c484a84353644c001958399b2b6b9e';

var searchBtn = document.getElementById('user-form')

var currentWeatherEL = document.getElementById('currentWeather');



function capValue(event){
    event.preventDefault()
    var cityCapture = document.getElementById("citySearch")
    
    getForecast(cityCapture.value)
}


function getForecast(city) {
   
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&appid=' + apiKey)
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {
            console.log(data)

            var lat = data[0].lat;
            var lon = data[0].lon;
            var cityName = data[0].name
            console.log(lat, lon);

            fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=imperial")
                .then(function (response) {
                    return response.json()
                })
                .then(function (weatherData) {
                   getCurrentWeatherData(weatherData.current, cityName)
                })
        })
    //
}

function getCurrentWeatherData(weather, city){
console.log(weather)
var temp = weather.temp; 
var tempEL = document.createElement("p");
tempEL.textContent = temp
    console.log(tempEL);
//humidity
var humidity = weather.humidity;
var humidityEL = document.createElement("p");
humidityEL.textContent = humidity
//wind speed
var speed = weather.wind_speed;
var speedEL = document.createElement("p");
speedEL.textContent = speed
//uv index
var uvi = weather.uvi;
var uviEL = document.createElement("p");
uviEL.textContent = uvi

var icon = weather.weather[0].icon;
var iconEL = document.createElement("img");
iconEL.setAttribute("src", icon);

var date = weather.dt;
var dateEL = document.createElement("h1");
dateEL.textContent = date 
currentWeatherEL.append(tempEL, humidityEL, speedEL , uviEL, iconEL, dateEL);

}

 //var fiveDays = 'http://api.openweathermap.org/data/2.5/forecast?lat&lon&appid=' + apiKey;




// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

searchBtn.addEventListener('submit', capValue)