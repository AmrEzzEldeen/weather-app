const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const APIKey = "185dbcc57e27f9315a49d3f1c762ebd7";

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = `400px`;

        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";

        error404.classList.add("fade-in");
        error404.style.display = `block`;
        return;
      }

      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";

      error404.classList.remove("fade-in");
      error404.style.display = `none`;

      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temperature");
      const desc = document.querySelector(".weather-box .description");
      const wind = document.querySelector(".weather-details .wind span");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      desc.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      container.style.height = "600px";
      return
    })
    .catch((err) => {
      console.log(`Error occured in request: ${err}`);
      container.style.height = `400px`;

      weatherBox.style.display = "none";
      weatherDetails.style.display = "none";

      error404.classList.add("fade-in");
      error404.style.display = `block`;
      return;
    });
});
