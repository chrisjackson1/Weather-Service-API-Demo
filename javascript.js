// var userFormEl = document.querySelector('#user-form');
// var nameInput = document.querySelector('#username');

// use fetch to get the openweathe api url


var apiKey = 'a8c484a84353644c001958399b2b6b9e';

var geourl = 'http://api.openweathermap.org/geo/1.0/direct?q=Philadelphia&appid=' + apiKey;

//var fiveDays = 'http://api.openweathermap.org/data/2.5/forecast?lat&lon&appid=' + apiKey;

// fetch(geourl)
//     .then(function (response) {

//         return response.json()
//     })
//     .then(function (data) {
//         console.log(data)

//         var lat = data[0].lat;
//         var lon = data[0].lon;
//         console.log(lat, lon);
//         fetch(fiveDays);
//     })




function getForecast(city) {

    var cityCapture = document.getElementById("citySearch")
    cityCapture.textContent = city
    fetch(geourl)
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {
            console.log(data)

            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat, lon);
            
            fetch ('http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon='+ lon + apiKey)
            .then(function(response){
                return response.json
            })
            .then(function(data){
            console.log(data, "this is the second one")
            })
        })
//
}
    getForecast()
 //var fiveDays = 'http://api.openweathermap.org/data/2.5/forecast?lat&lon&appid=' + apiKey;




// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}