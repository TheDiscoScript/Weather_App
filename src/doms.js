function getDOMs() {
  const tempButton = document.getElementById("buttonTemperature");
  const gifLeft = document.getElementById("gifLeft");
  const gifRight = document.getElementById("gifRight");
  const cityInput = document.getElementById("input");
  const cityName = document.getElementById("city");
  const country = document.getElementById("country");
  const minT = document.getElementById("minT");
  const averageT = document.getElementById("averageT");
  const maxT = document.getElementById("maxT");
  const description = document.getElementById("description");
  const status = document.getElementById("status");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const currentTime = document.getElementById("currentTime");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  return {
    tempButton,
    gifLeft,
    gifRight,
    cityInput,
    cityName,
    country,
    minT,
    averageT,
    maxT,
    description,
    status,
    wind,
    humidity,
    currentTime,
    sunrise,
    sunset,
  };
}
const DOMS = getDOMs();
export default DOMS;
