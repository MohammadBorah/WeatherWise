
function predictClothingType(humidity,temperature,windSpeed) {


  // Send data to the server (you may need to adjust the URL and method based on your backend)
  fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ temperature, humidity, windSpeed }),
  })
  .then(response => response.json())
  .then(data => {
    // Display the predicted clothing type
    const resultElement = document.getElementById('result');
    resultElement.innerText = 'Predicted Clothing Type: ' + data.clothingType; // Change to data.clothingType

    // Set image based on predicted clothing type
    const imageElement = document.getElementById('clothingImage');
    switch (data.clothingType) {
      case 'low':
        imageElement.src = '/static/low.png'; // Correct if using Flask

        break;
      case 'moderate':
        imageElement.src = '/static/mid.png';
        break;
      case 'heavy':
        imageElement.src = '/static/heavy.png';
        break;
      default:
        // Set a default image if the clothing type is unknown
        imageElement.src = 'path/to/default_image.png';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    const resultElement = document.getElementById('result');
    resultElement.innerText = 'Error predicting clothing type.';
  });
}

document.addEventListener('DOMContentLoaded', function () {
///////////////////////////
////weather data urls
const BASE_KEY = "be5ab507efe19fa17051973e945f0555";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
///////////////////////////
///icon and backgrounds
const assets = [
  {
    id: "Clear",
    icon_day:
      "https://assets10.lottiefiles.com/private_files/lf30_moaf5wp5.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_iugenddu.json",
    cloud: "",
  },
  {
    id: "Clouds",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_ykkzuozu.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_5tzqguri.json",
    cloud: "https://assets10.lottiefiles.com/temp/lf20_VAmWRg.json",
  },
  {
    id: "Haze",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_jvkyx6tg.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_qqhrsksk.json",
    cloud: "https://assets10.lottiefiles.com/temp/lf20_VAmWRg.json",
  },
  {
    id: "Rain",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_rb778uhf.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_jr9yjlcf.json",
    cloud: "https://assets7.lottiefiles.com/private_files/lf30_orqfuyox.json",
  },
  {
    id: "Snow",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_w5u9xr3a.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_9bptg8sh.json",
    cloud: "https://assets3.lottiefiles.com/temp/lf20_WtPCZs.json",
  },
  {
    id: "Thunderstorm",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_kj3arjju.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_22gtsfnq.json",
    cloud: "https://assets4.lottiefiles.com/packages/lf20_kw1r63j7.json",
  },
];

///////////////////////////
///variables
let isLightMode;
const hours = new Date().getHours();
const isDayTime = hours > 6 && hours < 20;
const body = document.body;
const lang = document.querySelector(".lang_btn");
const infoButton = document.querySelector(".more_info_btn");
const info = document.querySelector(".more_info");
const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search_btn");
const city = document.querySelector(".location");
const date = document.querySelector(".date");
const temperatureDisplay = document.querySelector(".temp");
const WeatherType = document.querySelector(".weather");
const maxTemperature = document.querySelector(".max_temp");
const minTemperature = document.querySelector(".min_temp");
const maxTemperatureTitle = document.querySelector(".max_temp_title");
const minTemperatureTitle = document.querySelector(".min_temp_title");
const windDegree = document.querySelector(".wind_degree");
const windSpeed = document.querySelector(".wind_speed");
const windDegreeTitle = document.querySelector(".wind_degree_title");
const windSpeedTitle = document.querySelector(".wind_speed_title");
const weatherIcon = document.querySelector(".weather_icon");
const infoText = document.querySelector(".more_info_txt");
const darkMode = document.querySelector(".dark_mode_btn");
const weatherCard = document.querySelector(".weather_container");
const weatherCardBody = document.querySelector(".weather_body");
const cloud1 = document.querySelector(".cloud1");
const cloud2 = document.querySelector(".cloud2");
const sky = document.querySelector(".wrapper");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const stars = document.querySelectorAll(".stars");
const humidity = document.querySelector(".humidity") ; 

//handle dayTime for default dark or light mode
isDayTime ? (isLightMode = true) : (isLightMode = false);
if (!isLightMode) handleDarkMode();
/////////////////////////
///functions
////////////////////////
//get weather data from server and api error handling
async function renderWeatherAsync(City) {
  try {
    const weatherURL = `${BASE_URL}?q=${City}&appid=${BASE_KEY}&units=metric&lang=${lang.innerHTML.toLowerCase()}`;
    const req = await fetch(weatherURL);
    const res = await req.json();
    const showWeather = await showWeatherInfo(res);
    
    return showWeather;
  } catch {
    infoButton.classList.remove("rotate");
    info.classList.remove("active");
    temperature.innerHTML = "";
    humidity.innerHTML = "";
    WeatherType.innerHTML = "";
    weatherIcon.innerHTML =
      '<lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_tzxtv5wy.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin:0 auto;" loop  autoplay></lottie-player>';
    date.innerHTML = "";
    infoButton.disabled = true;
    if (lang.innerHTML.toLowerCase() === "en") {
      city.innerHTML = "Search your location...";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Location not found!",
      });
    } else {
      city.innerHTML = "أبحث عن مكان...";
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "!لا يوجد نتائج",
      });
    }
  }
}
//key and mouse event on searchbar to search
searchInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    renderWeatherAsync(searchInput.value);
  }
});
//or
searchButton.addEventListener("click", () => {
  renderWeatherAsync(searchInput.value);
});
//show weather information
function showWeatherInfo(weather) {
  cloud1.classList.remove("cloudMove1");
  cloud2.classList.remove("cloudMove2");
  city.innerHTML = `${weather.name} , ${weather.sys.country}`;
  if (lang.innerHTML.toLowerCase() === "en") {
    date.innerHTML = new Date().toLocaleDateString("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } else {
    date.innerHTML = new Date().toLocaleDateString("fa", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  // Extract temperature, humidity, and wind speed
  const temperature = Math.round(weather.main.temp);
  const humidityValue = weather.main.humidity;
  const windSpeedValue = weather.wind.speed;

  // Display temperature, humidity, and other information
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  temperatureDisplay.innerHTML = `<h1>${Math.round(weather.main.temp)}&deg;C</h1>`;
  WeatherType.innerHTML = `${weather.weather[0].description}`;
  infoButton.disabled = false;

  // Display icons and animations
  assets.forEach((item) => {
    if (weather.weather[0].main === item.id) {
      isLightMode
        ? (weatherIcon.innerHTML = `<lottie-player src="${item.icon_day}"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin: 0 auto"  loop  autoplay></lottie-player>`)
        : (weatherIcon.innerHTML = `<lottie-player src="${item.icon_night}"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin: 0 auto"  loop  autoplay></lottie-player>`);
      cloud1.innerHTML = `<lottie-player
      src="${item.cloud}"
      background="transparent"
      speed="0.5"
      style="width: 400px; height: 400px"
      loop
      autoplay
    ></lottie-player>`;
      cloud2.innerHTML = `<lottie-player
      src="${item.cloud}"
      background="transparent"
      speed="0.5"
      style="width: 300px; height: 300px"
      loop
      autoplay
    ></lottie-player>`;
    }
  });

  // Animate clouds
  setTimeout(() => {
    cloud1.classList.add("cloudMove1");
    cloud2.classList.add("cloudMove2");
  }, 1000);

  // Display additional weather information
  maxTemperature.innerHTML = `  ${Math.round(weather.main.temp_max)}&deg;C`;
  minTemperature.innerHTML = `  ${Math.round(weather.main.temp_min)}&deg;C`;
  windDegree.innerHTML = ` ${weather.wind.deg}^`;
  windSpeed.innerHTML = ` ${windSpeedValue} M/S`;

  // Call the predictClothingType function with extracted values
  predictClothingType(humidityValue, temperature, windSpeedValue);
}

//more info button toggler
infoButton.addEventListener("click", () => {
  infoButton.classList.toggle("rotate");
  info.classList.toggle("active");
});
//handle language
lang.addEventListener("click", () => {
  if (lang.innerHTML.toLowerCase() === "en") {
    body.style.fontFamily = "Shabnam FD";
    lang.innerHTML = "AR";
    city.innerHTML = "...أبحث عن مكان";
    infoText.innerHTML = " المزيد من المعلومات";
    maxTemperatureTitle.innerHTML = "أقصى درجة:";
    minTemperatureTitle.innerHTML = "أدنى درجة:";
    windDegreeTitle.innerHTML = "درجه:";
    windSpeedTitle.innerHTML = "سرعة:";
    if (searchInput.value !== "") {
      renderWeatherAsync(searchInput.value);
    }
  } else {
    body.style.fontFamily = "Poppins";
    city.innerHTML = "Search your location...";
    lang.innerHTML = "EN";
    infoText.innerHTML = "More Info";
    maxTemperatureTitle.innerHTML = "Max:";
    minTemperatureTitle.innerHTML = "Min:";
    windDegreeTitle.innerHTML = "Degree:";
    windSpeedTitle.innerHTML = "Speed:";
    if (searchInput.value !== "") {
      renderWeatherAsync(searchInput.value);
    }
  }
});

//////////////////////////
//dark and light mode
function handleDarkMode() {
  darkMode.classList.toggle("dark_txt");
  if (darkMode.classList.contains("dark_txt")) {
    isLightMode = false;
    darkMode.innerHTML = `<i class="fas fa-moon"></i>`;
    sky.style.backgroundImage = "linear-gradient(#2a2c36 70%, #121318)";
    stars.forEach((star) => {
      star.style.opacity = 1;
      sun.classList.remove("highNoonSun");
      moon.classList.add("fullMoon");
    });
  } else {
    isLightMode = true;
    darkMode.innerHTML = `<i class="fas fa-sun"></i>`;
    sky.style.backgroundImage = "linear-gradient(skyBlue 70%, dodgerBlue)";
    moon.classList.remove("fullMoon");
    sun.classList.add("highNoonSun");
    stars.forEach((star) => {
      star.style.opacity = 0;
    });
  }
  weatherCard.classList.toggle("dark_bg");
  weatherCardBody.classList.toggle("dark_bg");
  lang.classList.toggle("dark_txt");
  weatherCardBody.classList.toggle("dark_txt");
  infoButton.classList.toggle("dark_txt");
  if (searchInput.value != "") renderWeatherAsync(searchInput.value);
}
darkMode.addEventListener("click", handleDarkMode);
//weekely data 

document.getElementById('dayButton').addEventListener('click', getHourlyWeatherForecast);
document.getElementById('weekButton').addEventListener('click', getyWeatherForecast);
});

/// active 


function createCarouselItem(item, date, isActive) {
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-container');

  const weatherIcon = document.createElement('img');
  const weatherIconCode = item.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
  weatherIcon.style.width = '100px';
  weatherIcon.style.height = '100px';
  weatherIcon.src = weatherIconUrl;
  weatherIcon.alt = 'Weather Icon';

  iconContainer.appendChild(weatherIcon);

  const temperatureKelvin = item.main.temp;
  const temperatureCelsius = temperatureKelvin - 273.15;
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');
  infoContainer.innerHTML = `
    <strong>${date.getHours()}:00</strong>
    <p>Temperature: <span class="temperature">${temperatureCelsius.toFixed(2)}</span> &#8451;</p>
    <p>Weather: <span class="weather-description">${item.weather[0].description}</span></p>`;

  const carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  if (isActive) {
    carouselItem.classList.add('active');
  }

  carouselItem.appendChild(iconContainer);
  carouselItem.appendChild(infoContainer);

  return carouselItem;
}
  ///weeekely data 

  function createWeeklyWeatherCard(item, date) {
   
    const card = document.createElement('div');
    card.classList.add('card', 'day', 'card-week');
  
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');
  
    const weatherIcon = document.createElement('img');
    const weatherIconCode = item.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
    weatherIcon.style.width = '100px'; // Adjust the width as needed
    weatherIcon.style.height = '100px';
    weatherIcon.src = weatherIconUrl;
    weatherIcon.alt = 'Weather Icon';
  
    iconContainer.appendChild(weatherIcon);
  
    const temperatureKelvin = item.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    infoContainer.innerHTML = `
      <strong>${date.toDateString()}</strong>
      <p>Temperature: <span class="temperature">${temperatureCelsius.toFixed(2)}</span> &#8451;</p>
      <p>Weather: <span class="weather-description">${item.weather[0].description}</span></p>`;
  
    card.appendChild(iconContainer);
    card.appendChild(infoContainer);
  
    return card;
  }

 

  async function getyWeatherForecast() {
 
  
    const city = document.querySelector(".search_input").value;
    const apiKey = 'be5ab507efe19fa17051973e945f0555';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const forecastContainer = document.getElementById('weekly-forecast');
      const weatherIconContainer = document.getElementById('weather-icon');
  
      if (!forecastContainer || !weatherIconContainer) {
        console.error('Containers not found');
        return;
      }

      forecastContainer.innerHTML = '';
      weatherIconContainer.innerHTML = '';
  
      // Iterate through the next 4 days
      for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];
        if (!item) continue;
  
        const date = new Date(item.dt * 1000);
  
        const weeklyCard = createWeeklyWeatherCard(item, date);
  
        forecastContainer.appendChild(weeklyCard);
      }
    } catch (error) {
      console.error('Error fetching weekly weather data:', error);
    }
  }
  
  async function getHourlyWeatherForecast() {
   
  
    const city = document.querySelector(".search_input").value;
    const apiKey = 'be5ab507efe19fa17051973e945f0555';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    activeForecastType = 'day';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const forecastContainer = document.querySelector('.carousel-inner');
      const weatherIconContainer = document.getElementById('weather-icon');
  
      if (!forecastContainer || !weatherIconContainer) {
        console.error('Containers not found');
        return;
      }
  
      console.log('Active Forecast Type:', activeForecastType);
  
      if (activeForecastType !== 'day') {
        console.log('Not executing hourly forecast. Active type is:', activeForecastType);
        return;
      }
  
      forecastContainer.innerHTML = '';
      weatherIconContainer.innerHTML = '';
  
      for (let i = 0; i < 24; i++) {
        const item = data.list[i];
        if (!item) continue;
  
        const date = new Date(item.dt * 1000);
  
        const carouselItem = createCarouselItem(item, date, i === 0);
  
        forecastContainer.appendChild(carouselItem);
      }
    } catch (error) {
      console.error('Error fetching hourly weather data:', error);
    }
  }
  


