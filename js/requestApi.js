// get user loc
// precisa retornar uma Promise
export function getUserLocation() {
  // a promise pode retornar um sucesso ou falha
  return new Promise((resolve, reject) => {
    // verifica se o navegador suporta geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // extrai lat/long de position.coords
          const { latitude, longitude } = position.coords;
          console.log("coords: " + latitude + longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
          console.error("erro: ", error);
        }
      );
    } else {
      reject("Geolocalização não suoprtada.");
    }
  });
}

// passa as coordenadas para a API
async function getWeather() {
  try {
    // captura a lat/longitude da função
    const { latitude, longitude } = await getUserLocation();

    // const response = await fetch(
    //   `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`
    );

    // guarda o resuldado de response e transforma em objeto JS
    const data = await response.json();

    return data.current;
  } catch (error) {
    console.log(error);
  }
}

export async function weatherCode() {
  // pegando o resultado de getWeather
  const currentWeather = await getWeather();

  const sun = 1;
  const cloudy = 2;
  const raining = 3;

  let statusWeather;

  if (currentWeather.weather_code >= 49 && currentWeather.weather_code <= 99) {
    console.log("Chuva!");

    statusWeather = raining;
    // console.log(currentWeather.temperature_2m)
    // console.log(currentWeather.time)
    // return raining, isDay;
  } else if (
    currentWeather.weather_code >= 1 &&
    currentWeather.weather_code <= 48
  ) {
    console.log("Neblina...");
    statusWeather = cloudy;
  } else {
    console.log("Sol!");
    statusWeather = sun;
  }

  // está retornando um objeto
  return {
    status: statusWeather,
    isDay: currentWeather.is_day,
    temperature: currentWeather.temperature_2m,
  };
}

// a função tem a lat/long que pegamos das funções anteriores
export async function getCityName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    // resposta em json
    const data = await response.json();
    
    if (data.address) {
      if (data.address.city) {
        console.log("Cidade: ", data.address.city);
        return data.address.city;
      }
    } else {
      return "erro";
    }
  } catch (error) {
    console.log(error);
  }
}

// // window.onload = getUserLocation;
weatherCode();
