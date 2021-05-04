const searchedCity = document.getElementById('search')
const imperial = document.getElementById('imperial')
const metric = document.getElementById('metric')
let currWeather, forecast, currDate, loc, maxTemp, temp, feels, icon, detail, description, uppercaseDetail, deg, forecastMax;

imperial.addEventListener('click', (e) => domUpdates.displayWeather(e))
metric.addEventListener('click', (e) => domUpdates.displayWeather(e))

const domUpdates = {
  assignData: (data) => {
    currWeather = data
    const date = new Date()
    currDate = dayjs(date).format('ddd, MMMM D, h:mm A')
    loc = `${currWeather.name}, ${currWeather.sys.country}`
    icon = currWeather.weather[0].icon
    description = currWeather.weather[0].main
    detail = currWeather.weather[0].description
    uppercaseDetail = detail.charAt(0).toUpperCase() + detail.slice(1)
    domUpdates.displayWeather()
  },

  convertTemp: () => {
    maxTemp = parseInt(currWeather.main.temp_max)
    minTemp = parseInt(currWeather.main.temp_min)
    temp = parseInt(currWeather.main.temp)
    feels = parseInt(currWeather.main.feels_like)
  },

  displayWeather(e) {
    errorField.innerText = ''
    todaysWeather.innerHTML = ''
    domUpdates.changeUnitType(e) 
    domUpdates.changeBgColor()
    todaysWeather.innerHTML = `
    <article class="info">
      <p class="date">${currDate}</p>
      <p class="location">${loc}</p>
      <p class="high-low">High ${maxTemp}° / Low ${minTemp}°</p>
      <p class="temp">${temp}${deg}</p>
      <p class="feels-like">Feels like ${feels}°</p>
    </article>
    <figure class="icon-container">
      <img class="icon"
      src="http://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}">
      <figcaption class="today-caption">${uppercaseDetail}</figcaption>
    </figure>`
    if (forecast) {
      domUpdates.displayForecastData()
    }
  },

  displayForecastData: (data = null) => {
    errorField.innerText = ''
    forecastWeather.innerHTML = ''
    if (!data) {
      forecast.map(weather => {
        deg === '°F' ? forecastMax = weather.temp.max : forecastMax = (weather.temp.max - 32 ) * 5/9
        const getDay = dayjs(weather.dt * 1000).format('ddd')
        forecastWeather.innerHTML += `
        <figure class="icon-container">
          <img class="mini-icon"
            src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"
            alt="${weather.weather[0].main}">
          <figcaption class="mini-cap">${parseInt(forecastMax)}${deg} </figcaption>
          <figcaption class="mini-cap">${getDay}</figcaption>
        </figure>`
      })
    } else {
      forecast = data.daily
      forecast.shift()
      forecast.pop()
      forecast.map(weather => {
        const getDay = dayjs(weather.dt * 1000).format('ddd')
        forecastMax = weather.temp.max
        forecastWeather.innerHTML += `
        <figure class="icon-container">
          <img class="mini-icon"
            src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"
            alt="${weather.weather[0].main}">
          <figcaption class="mini-cap">${Math.round(forecastMax)}${deg} </figcaption>
          <figcaption class="mini-cap">${getDay}</figcaption>
        </figure>`
      })
    }

  },

  changeBgColor: () => {
    if ((deg === '°F' && temp < 47) || (deg === '°C' && temp < 8.3) ) {
      document.getElementById("main").style.backgroundImage = `linear-gradient(#4467A3, #576EA4, #6673A4, #867FA5, #A38BA4, #C19EA6)`;
      document.body.style.backgroundImage = `linear-gradient(#15235A, #1F2A65, #59488C,  #8D5F9E )`;
    } 
    else {
      document.getElementById("main").style.backgroundImage = `linear-gradient(#0679FD, #088BFE, #1983c5, #6ACFFD, #B1F1FE,  #BAF2FF  )`;
      document.body.style.backgroundImage = `linear-gradient(#0962c9, #088BFE,  #B1F1FE,  #27606d)`;
    } 
  },

  changeUnitType: (e) => {
    if (e) {
      const getID = e.target.id
      if (getID === 'imperial') {
        maxTemp = parseInt(currWeather.main.temp_max)
        minTemp = parseInt(currWeather.main.temp_min)
        temp = parseInt(currWeather.main.temp)
        feels = parseInt(currWeather.main.feels_like)
        deg = `°F`;
      } else if (getID === 'metric') {
        maxTemp = parseInt(((currWeather.main.temp_max) - 32) * 5/9)
        minTemp = parseInt(((currWeather.main.temp_min) - 32) * 5/9)
        temp = parseInt(((currWeather.main.temp) - 32) * 5/9)
        feels = parseInt(((currWeather.main.feels_like) - 32) * 5/9)
        deg = `°C`;
      } 
    } else {
      maxTemp = parseInt(currWeather.main.temp_max)
      minTemp = parseInt(currWeather.main.temp_min)
      temp = parseInt(currWeather.main.temp)
      feels = parseInt(currWeather.main.feels_like)
      deg = `°F`;
    }
  }
}