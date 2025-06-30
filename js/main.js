import { initializeRainCanvas, createDrops, animateDrop } from "./rain.js";
import { weatherCode, getCityName, getUserLocation } from "./requestApi.js";

async function startSite() {
  const currentWeather = await weatherCode();
  const getUserCityName = await getCityName();

  document.getElementById("temperatureSpan").innerHTML = `${Math.floor(currentWeather.temperature)}°C,`

  if (currentWeather.status === 3) {
    if (currentWeather.isDay === 1) {
      document.getElementById("daySpan").innerHTML = "Dia,"
    } else {
      document.getElementById("daySpan").innerHTML = "Noite,"
    }
    // muda o span para "chuva"
    document.getElementById("weatherSpan").innerHTML = "Chuva!"

    initializeRainCanvas("canvas");
    createDrops(30);
    animateDrop();
  }

}

document.addEventListener("DOMContentLoaded", async () => {
  startSite();
});
