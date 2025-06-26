function getWeatherByLocation(location) {
  fetch(
    "" + location
    // checa se deu certo
  )
    .then((response) => {
      // se deu erro
      if (!response.ok) {
        throw new Error(`ERRO! ${response.status}`);
      } // senão, retorna json
      return response.json();
    })
    .then((data) => {
        var climaTexto = data.current.condition.text.toLowerCase()
        if (climaTexto.includes("rain")) {
            tema = "rain"
        }
        else if (climaTexto.includes("sun")) {
            
        }
        console.log("data: ", data.current.condition.text);
    })
    .catch((error) => {
      console.error("ERRO!", error);
    });
}
