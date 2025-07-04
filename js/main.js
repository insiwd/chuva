import { initializeRainCanvas, createDrops, animateDrop } from "./rain.js";
import { weatherCode, getCityName, getUserLocation } from "./requestApi.js";
import { initializeSunParticles, createSunParticles, animateSunParticles } from "./sun.js";
import { initializeCloudyParticles, createCloudyParticles, animateCloudyParticles } from "./cloudy.js";

async function startSite() {
  const currentWeather = await weatherCode();

  let userCoords;
  let userCityName;

  try {
    userCoords = await getUserLocation();
    const { latitude, longitude } = userCoords;

    userCityName = await getCityName(latitude, longitude);
  } catch (error) {
    console.error("Erro");
    window.alert("Erro! não sei onde você está... (-_-')");
  }

  document.getElementById("citySpan").innerHTML = `${userCityName},`;

  document.getElementById("temperatureSpan").innerHTML = `${Math.floor(
    currentWeather.temperature
  )}°C,`;

  if (currentWeather.status === 3) {
    if (currentWeather.isDay === 1) {
      document.getElementById("daySpan").innerHTML = "Dia,";
    } else {
      document.getElementById("daySpan").innerHTML = "Noite,";
    }
    // muda o span para "chuva"
    document.getElementById("weatherSpan").innerHTML = "Chuva!";

    initializeRainCanvas("canvas");
    createDrops(30);
    animateDrop();
  } else if (currentWeather.status === 2) {
    // nublado
    document.getElementById("weatherSpan").innerHTML = "Nublado!";

    initializeCloudyParticles("canvas");
    createCloudyParticles(30);
    animateCloudyParticles();
   
  } else {
    document.getElementById("weatherSpan").innerHTML = "Sol!";
    
    initializeSunParticles("canvas");
    createSunParticles(30);
    animateSunParticles();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  startSite();
});
