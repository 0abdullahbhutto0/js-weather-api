const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "fecb7b6990764d797cf2c4daf5640c70";
weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value;
  if(city){
    try{
      const weatherData = await getWeather(city);
      displayWeather(weatherData);

    }catch (e) {
      console.error(e);
      displayError(e);
    }
  }else{
    displayError("Please Enter a City");
  }
});
async function getWeather(city) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not find a valid city");
  }
  return await response.json();

}
function displayWeather(data){
  const {name: city,
         main: {temp, humidity},
         weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}`;
  descDisplay.textContent = `${description}`;
  emojiDisplay.textContent = getWeatherEmoji(id);
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descriptionDisplay");
  emojiDisplay.classList.add("weatherEmoji");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(emojiDisplay);
}
function getWeatherEmoji(weatherId){
switch(true){
  case (weatherId>=200 && weatherId < 300):{
    return "🌩️";
  }
  case (weatherId >= 300 && weatherId< 400):{
    return "☔";
  }
  case (weatherId >= 500 && weatherId< 600):{
    return "🌧️";
  }
  case (weatherId >= 600 && weatherId< 700):{
    return "❄️";
  }
  case (weatherId >= 700 && weatherId< 800):{
    return "🌫️";
  }
  case (weatherId === 800):{
    return "🌞";
  }
  case (weatherId >= 801 && weatherId< 810):{
    return "☁️";
  }
  default:
    return "❓";
}
}
function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

