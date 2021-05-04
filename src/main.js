searchedCity.addEventListener('keypress', getCityName)
window.onload = getCurrentData('Denver')

function getCityName(e) {
  if (e.keyCode === 13 && searchedCity.value) {
    api.unitType
    getCurrentData(searchedCity.value)
  }
}

function getCurrentData(city) {
  apiCalls.fetchWeatherData(city)
    .then(data => {
      domUpdates.assignData(data)
      getForecastData(data.coord.lat, data.coord.lon)
    })
}
  
function getForecastData(lat, lon) {
  apiCalls.fetchForecastData(lat, lon)
    .then(data => {
      domUpdates.displayForecastData(data)
    })
}



