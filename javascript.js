// var userFormEl = document.querySelector('#user-form');
// var nameInput = document.querySelector('#username');

// use fetch to get the openweathe api url


var apiKey = 'a8c484a84353644c001958399b2b6b9e';

var searchBtn = document.getElementById('user-form')

var currentWeatherEL = document.getElementById('currentWeather');

var city = ''



function capValue(event) {
    event.preventDefault()
    city = document.getElementById("citySearch").value
    getForecast()
}


function getForecast() {

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey)
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {
            console.log(data)

            var lat = data[0].lat;
            var lon = data[0].lon;

            fetch('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=imperial")
                .then(function (response) {
                    return response.json()
                })
                .then(function (weatherData) {
                    console.log(weatherData)
                    getCurrentWeatherData(weatherData.current)
                })
        })
    //
}

function getCurrentWeatherData(weather) {
    console.log(weather)
    var temp = weather.temp;
    var tempEL = document.createElement("p");
    tempEL.textContent = 'Temperature: ' + temp + 'F';
    console.log(tempEL);
    //humidity
    var humidity = weather.humidity;
    var humidityEL = document.createElement("p");
    humidityEL.textContent = 'Humidity: ' + humidity + '%';
    //wind speed
    var speed = weather.wind_speed;
    var speedEL = document.createElement("p");
    speedEL.textContent = 'Wind: ' + speed + 'mph';
    //uv index
    var uvi = weather.uvi;
    var uviEL = document.createElement("p");
    uviEL.textContent = 'UV index: ' + uvi;
    if (uvi <= 3){
        console.log('lowUvi')
        uviEL.style.backgroundColor = 'lightblue';
    } else if (uvi <= 6){
        console.log('mediumUvi')
        uviEL.style.backgroundColor = 'yellow';
    } else {
        console.log('highUvi')
        uviEL.style.backgroundColor = 'orange';
    }


    var icon = weather.weather[0].icon;
    var iconEL = document.createElement("img");
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    iconEL.setAttribute("src", iconurl);

    var unix_timestamp = weather.dt;
   
        var date = new Date(unix_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var date = date.getDate();
        var time = month + ' ' + date + ' ' + year + ' ' ;
  
      

console.log(time);
    var dateEL = document.createElement("h1");
    dateEL.textContent = city + ' ' + time;
    currentWeatherEL.innerHTML = ''
    currentWeatherEL.append(dateEL,iconEL, tempEL, humidityEL, speedEL, uviEL ) ;

}

//var fiveDays = 'http://api.openweathermap.org/data/2.5/forecast?lat&lon&appid=' + apiKey;




// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

searchBtn.addEventListener('submit', capValue)