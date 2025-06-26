async function getLocation(location) {
  const response = await fetch(`https://api.open-meteo.com/v1/search?name=${location}&count=1&language=pt&format=json`);

  // transformando a resposta em JSON
  const data = await response.json();
  const result = data.results[0];
  return {
    name: result.name || "",
    lat: result.latitude,
    lon: result.longitude
  }
}

async function getWeather(location) {
  const {lat, lon, name} = await getLocation(location);
  //current weather
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`);
  const data = await response.json();
  return {
    name, 
    current: data.current,
    daily: data.daily
  }
}
