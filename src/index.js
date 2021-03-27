//logic
//getCity->findWeather-->processData-->assignData-->
import DOMS from "./doms";
import moment from "moment";

async function findWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d56c66401ee8ce76e157d9cc7f1da8e&units=metric`,
    { mode: "cors" }
  );
  if (response.status === 404)
    alert(
      "Error!Error!Error! We were unable to find this city. Please try again with different city"
    );
  const cityData = await response.json();
  const wantedDataObj = processData(cityData);
  assignData(wantedDataObj);
}
function processData(citydata) {
  const requiredData = {
    location: {
      city: citydata.name,
      country: citydata.sys.country,
    },
    temperature: {
      minimal: {
        f: Math.round(citydata.main.temp_min + 33.8) + "°F",
        c: Math.round(citydata.main.temp_min) + "°C",
      },
      average: {
        f: Math.round(citydata.main.temp + 33.8) + "°F",
        c: Math.round(citydata.main.temp) + "°C",
      },
      maximal: {
        f: Math.round(citydata.main.temp_max + 33.8) + "°F",
        c: Math.round(citydata.main.temp_max) + "°C",
      },
    },
    weather: {
      status: citydata.weather[0].main,
      description: citydata.weather[0].description,
    },
    stats: {
      wind: "Wind: " + Math.round(citydata.wind.speed) + " km/h",
      humidity: "Humidity: " + citydata.main.humidity + "%",
    },
    sun: {
      sunrise: "Sunrise: " + moment.unix(citydata.sys.sunrise).format("hh:mm"),
      sunset: "Sunset: " + moment.unix(citydata.sys.sunset).format("HH:mm"),
    },
  };
  return requiredData;
}
function assignData(object) {
  DOMS.cityName.textContent = object.location.city;
  DOMS.country.textContent = object.location.country;
  DOMS.status.textContent = object.weather.status;
  DOMS.description.textContent = object.weather.description;
  DOMS.wind.textContent = object.stats.wind;
  DOMS.humidity.textContent = object.stats.humidity;
  DOMS.sunrise.textContent = object.sun.sunrise;
  DOMS.sunset.textContent = object.sun.sunset;

  function setTemperature() {
    if (DOMS.tempButton.classList.contains("fahrenheit")) {
      DOMS.minT.textContent = object.temperature.minimal.f;
      DOMS.averageT.textContent = object.temperature.average.f;
      DOMS.maxT.textContent = object.temperature.maximal.f;
    } else {
      DOMS.minT.textContent = object.temperature.minimal.c;
      DOMS.averageT.textContent = object.temperature.average.c;
      DOMS.maxT.textContent = object.temperature.maximal.c;
    }
  }
  setTemperature();
}

function switchTempUnits() {
  DOMS.tempButton.classList.toggle("fahrenheit");
}

//user's input
function getCity() {
  const userCity = DOMS.cityInput.value;
  findWeather(userCity);
}

//initialize
function initialize() {
  findWeather("Ústí nad Orlicí");
}
initialize();

function time() {
  const nowTime = moment();
  const formatedTime = nowTime.format("HH:mm:ss");
  DOMS.currentTime.textContent = formatedTime;
}
setInterval(time, 1000);

DOMS.cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    event.preventDefault();
    getCity();
    DOMS.cityInput.value = "";
  }
});
DOMS.tempButton.addEventListener("click", (e) => {
  switchTempUnits();

  //THIS IS STUPID BUT I CAN'T FIX IT
  findWeather(DOMS.cityName.textContent);
});
