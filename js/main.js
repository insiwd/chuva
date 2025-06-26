const cityName = document.getElementById("cityName");
const cityInput = document.getElementById("cityInput");

cityName.addEventListener("click", () => {
    cityName.style.display = "none";
    cityInput.style.display = "inline";

    cityInput.value = cityName.textContent.trim();
    cityInput.focus();
});

//ao perder o foco
cityInput.addEventListener("blur", () => {
    const newCity = cityInput.value.trim();
    if (newCity) {
        cityName.textContent = newCity;
        // TODO: chamar API
    }
    cityInput.style.display = "none";
    cityName.style.display = "inline";  
})

// enter
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        cityInput.blur();
    }
})