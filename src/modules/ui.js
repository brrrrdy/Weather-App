export function createInitialUI() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  // header
  const header = document.createElement("header");
  header.className = "app-header";

  const logo = document.createElement("div");
  logo.className = "app-logo";
  logo.textContent = "the weather";

  // search container
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.type = "text";
  searchInput.placeholder = "Search for a city...";

  searchContainer.appendChild(searchInput);
  header.appendChild(logo);
  header.appendChild(searchContainer);

  // main content
  const main = document.createElement("main");
  main.className = "app-main";

  const results = document.createElement("div");
  results.className = "results";

  const placeholder = document.createElement("p");
  placeholder.className = "muted";
  results.appendChild(placeholder);

  main.appendChild(results);

  pageContainer.appendChild(header);
  pageContainer.appendChild(main);

  return {
    pageContainer,
    searchInput,
    results,
    main,
  };
}

// map weather icon or description to image filename

function getWeatherIconFile(icon, description) {
  if (icon) return require(`../resources/images/weather_icons/${icon}.svg`);
  const desc = description.toLowerCase();
  if (desc.includes("clear") && desc.includes("night"))
    return require("../resources/images/weather_icons/clear-night.svg");
  if (desc.includes("clear"))
    return require("../resources/images/weather_icons/clear-day.svg");
  if (desc.includes("partly") && desc.includes("night"))
    return require("../resources/images/weather_icons/partly-cloudy-night.svg");
  if (desc.includes("partly"))
    return require("../resources/images/weather_icons/partly-cloudy-day.svg");
  if (desc.includes("cloud"))
    return require("../resources/images/weather_icons/cloudy.svg");
  if (desc.includes("fog"))
    return require("../resources/images/weather_icons/fog.svg");
  if (desc.includes("rain") && desc.includes("thunder"))
    return require("../resources/images/weather_icons/thunder-rain.svg");
  if (desc.includes("rain"))
    return require("../resources/images/weather_icons/rain.svg");
  if (desc.includes("showers") && desc.includes("night"))
    return require("../resources/images/weather_icons/showers-night.svg");
  if (desc.includes("showers") && desc.includes("day"))
    return require("../resources/images/weather_icons/showers-day.svg");
  if (desc.includes("showers"))
    return require("../resources/images/weather_icons/rain.svg");
  if (
    desc.includes("snow") &&
    desc.includes("showers") &&
    desc.includes("night")
  )
    return require("../resources/images/weather_icons/snow-showers-night.svg");
  if (desc.includes("snow") && desc.includes("showers") && desc.includes("day"))
    return require("../resources/images/weather_icons/snow-showers-day.svg");
  if (desc.includes("snow"))
    return require("../resources/images/weather_icons/snow.svg");
  if (desc.includes("wind"))
    return require("../resources/images/weather_icons/wind.svg");
  return require("../resources/images/weather_icons/clear-day.svg"); // fallback
}

export function createWeatherCard({
  loc,
  description,
  temp,
  unitLabel,
  feels,
  humidity,
  precipProb,
  icon,
}) {
  const card = document.createElement("article");
  card.className = "weather-card weather-grid-5";

  // city name
  const cityEl = document.createElement("div");
  cityEl.className = "city";
  cityEl.textContent = loc;

  // weather icon
  const imgEl = document.createElement("img");
  imgEl.className = "weather-img";
  imgEl.alt = description;
  imgEl.src = getWeatherIconFile(icon, description);

  console.log("icon:", icon);
  console.log("description:", description);
  console.log("img src:", imgEl.src);

  // current weather description
  const descEl = document.createElement("div");
  descEl.className = "description";
  descEl.textContent = description;

  // current temperature
  const tempEl = document.createElement("div");
  tempEl.className = "current-temp";
  const tempValue = document.createElement("span");
  tempValue.className = "value";
  tempValue.textContent = temp;
  const tempUnit = document.createElement("span");
  tempUnit.className = "unit";
  tempUnit.textContent = unitLabel;
  tempEl.appendChild(tempValue);
  tempEl.appendChild(tempUnit);

  // feels like, humidity, chance of rain
  const metricsRow = document.createElement("div");
  metricsRow.className = "metrics-row";

  // feels like
  const feelsDiv = document.createElement("div");
  feelsDiv.className = "metric";
  const feelsLabel = document.createElement("span");
  feelsLabel.className = "label";
  feelsLabel.textContent = "Feels like";
  const feelsValue = document.createElement("span");
  feelsValue.className = "value";
  feelsValue.textContent = `${feels}${unitLabel}`;
  feelsDiv.appendChild(feelsLabel);
  feelsDiv.appendChild(feelsValue);

  // humidity
  const humidityDiv = document.createElement("div");
  humidityDiv.className = "metric";
  const humidityLabel = document.createElement("span");
  humidityLabel.className = "label";
  humidityLabel.textContent = "Humidity";
  const humidityValue = document.createElement("span");
  humidityValue.className = "value";
  humidityValue.textContent = `${humidity}%`;
  humidityDiv.appendChild(humidityLabel);
  humidityDiv.appendChild(humidityValue);

  // chance of rain
  const rainDiv = document.createElement("div");
  rainDiv.className = "metric";
  const rainLabel = document.createElement("span");
  rainLabel.className = "label";
  rainLabel.textContent = "Chance of rain";
  const rainValue = document.createElement("span");
  rainValue.className = "value";
  rainValue.textContent = precipProb;
  rainDiv.appendChild(rainLabel);
  rainDiv.appendChild(rainValue);

  metricsRow.appendChild(feelsDiv);
  metricsRow.appendChild(humidityDiv);
  metricsRow.appendChild(rainDiv);

  // assembly
  card.appendChild(cityEl);
  card.appendChild(imgEl);
  card.appendChild(descEl);
  card.appendChild(tempEl);
  card.appendChild(metricsRow);

  return card;
}
