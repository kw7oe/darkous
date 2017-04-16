// API EndPoint
var baseURL =  "http://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&APPID=" + config.apiKey;


// Get Element
var locationField = document.getElementById("location-input");
var button = document.getElementById("button");
var output = document.getElementById("output");

var locationElement = document.getElementById("location-output");
var temperatureElement = document.getElementById("temperature");
var weatherElement = document.getElementById("weather");
var weatherDescElement = document.getElementById("weather-description");
var weatherIcon = document.getElementById("weather-icon");

// Add Evenet Listener to Button
button.addEventListener("click", function(event) {
  var location = locationField.value;
  var url = baseURL + location + apiKey ;

  getRequest(url, function(response) {
    var data = response.data;
    var location = data.name;
    var temperature = data.main.temp;
    var weather = data.weather[0];

    output.classList.remove("hidden");

    locationElement.innerText = "  " + location + "  ";
    temperatureElement.innerHTML = convertToCelsius(temperature) + " &degC";
    weatherElement.innerText = weather.main;
    weatherDescElement.innerText = weather.description;
    weatherIcon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png"
  });

});

// Convert Fahrenheit to Celsius
function convertToCelsius(temperature) {
  return parseInt(temperature - 273.15);
}

// GET Request
function getRequest(url, callback) {
  axios.get(url)
  .then(function(response) {
    callback(response);
  })
  .catch(function(error) {
    console.log(error)
  });
}
