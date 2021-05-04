const todaysWeather = document.getElementById('todayContainer')
const forecastWeather = document.getElementById('forecastContainer')
const errorField = document.getElementById('jsError')
const api = {
  myKey: `45833beddeb8dc3bec2ec8d182bda4d0`,
  currData: `https://api.openweathermap.org/data/2.5/weather?q=`,
  forecastData: `https://api.openweathermap.org/data/2.5/onecall?lat=`
}
const apiCalls = {
  displayErrorMessage(err) {
    const message = err.message === 
      'Failed to fetch' ?
      'Something went wrong. Please check your internet connection' 
      : err.message
    errorField.innerText = message
  },

  checkForError(response) {
    if (!response.ok) {
      errorField.innerText = `Sorry, we couldn't find city you're searching for.`
      todaysWeather.innerHTML = ''
      forecastWeather.innerHTML = ''
    } else {
      return response.json();
    }
  },

  fetchWeatherData(name) {
    return fetch(`${api.currData}${name}&units=imperial&appid=${api.myKey}`)
      .then(apiCalls.checkForError)
      .catch(err => apiCalls.displayErrorMessage(err))
  },

  fetchForecastData(lat, lon) {
    return fetch(`${api.forecastData}${lat}&lon=${lon}&units=imperial&appid=${api.myKey}`)
      .then(apiCalls.checkForError)
      .catch(err => apiCalls.displayErrorMessage(err))
  }

};