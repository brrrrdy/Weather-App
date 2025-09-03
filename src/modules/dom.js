import { createInitialUI, createWeatherCard } from "./ui";
import { fetchWeather } from "./api";
import { createUnitSwitcher } from "./unitSwitcher";

export function renderApp(rootEl) {
  const ui = createInitialUI();
  rootEl.appendChild(ui.pageContainer);

  let unitSwitcherInstance = null;

  // wrapper function that maintains state

  const performSearchWrapper = async () => {
    unitSwitcherInstance = await performSearch(ui, unitSwitcherInstance);
  };

  // event listeners

  ui.searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    await performSearchWrapper();
  });

  ui.searchButton.addEventListener("click", async () => {
    await performSearchWrapper();
  });

  ui.searchInput.addEventListener("input", () => {
    updateSearchButtonState(ui.searchInput, ui.searchButton);
  });

  updateSearchButtonState(ui.searchInput, ui.searchButton);
}

async function performSearch(ui, existingInstance) {
  const city = ui.searchInput.value.trim();
  if (!city) return existingInstance;

  const currentUnit = existingInstance
    ? existingInstance.getCurrentUnit()
    : "metric";

  await handleSearch(city, ui.results, currentUnit);

  const existingSwitcher = ui.main.querySelector(".unit-switcher");
  if (existingSwitcher) {
    existingSwitcher.remove();
  }

  const newInstance = createUnitSwitcher(ui.main, async (c, u) => {
    await handleSearch(c, ui.results, u);
  });

  newInstance.setCurrentCity(city, currentUnit);

  return newInstance;
}

function updateSearchButtonState(searchInput, searchButton) {
  const hasText = searchInput.value.trim().length > 0;
  searchButton.disabled = !hasText;
}

// handle search and render weather

async function handleSearch(city, mountPoint, unit) {
  setLoading(mountPoint, `Loading ${city}...`);
  try {
    const data = await fetchWeather(city, unit);
    renderWeather(mountPoint, data, unit);
    updateBackgroundBasedOnTime(data);
  } catch (err) {
    renderError(mountPoint, err);
  }
}

// Add this function to update background based on time
function updateBackgroundBasedOnTime(weatherData) {
  const currentTime = new Date().getTime() / 1000;
  const sunrise = weatherData?.currentConditions?.sunriseEpoch;
  const sunset = weatherData?.currentConditions?.sunsetEpoch;

  if (!sunrise || !sunset) {
    setBackgroundTime("day");
    return;
  }

  const newTimeOfDay =
    currentTime >= sunrise && currentTime < sunset ? "day" : "night";
  setBackgroundTime(newTimeOfDay);
}

function setBackgroundTime(timeOfDay) {
  const body = document.body;
  if (timeOfDay === "night") {
    body.classList.add("night-background");
  } else {
    body.classList.remove("night-background");
  }
}

// helpers
function renderWeather(container, data, currentUnit) {
  clearChildren(container);

  const loc = data?.resolvedAddress || data?.address || "Unknown location";
  const current = data?.currentConditions || {};
  const todayForecast = data?.days?.[0] || {};

  const temp = current.temp != null ? Math.round(current.temp) : "—";
  const feels = current.feelslike != null ? Math.round(current.feelslike) : "—";
  const humidity =
    current.humidity != null ? Math.round(current.humidity) : "—";

  let precipProb = "—";
  if (todayForecast.precipprob != null) {
    precipProb = `${Math.round(todayForecast.precipprob)}%`;
  } else if (todayForecast.pop != null) {
    precipProb = `${Math.round(todayForecast.pop)}%`;
  } else if (current.precip > 0) {
    precipProb = "Currently raining";
  }

  const description = current.conditions || todayForecast.conditions || "—";
  const unitLabel = currentUnit === "metric" ? "°C" : "°F";
  const icon = current.icon || "default";

  // UI builder function
  const card = createWeatherCard({
    loc,
    description,
    temp,
    unitLabel,
    feels,
    humidity,
    precipProb,
    icon,
  });

  container.appendChild(card);
}

function clearChildren(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function setLoading(container, message) {
  clearChildren(container);
  const p = document.createElement("p");
  p.className = "loading";
  p.textContent = message;
  container.appendChild(p);
}

function renderError(container, err) {
  clearChildren(container);

  const wrapper = document.createElement("div");
  wrapper.className = "error";

  const msg = document.createElement("p");
  msg.textContent = `Couldn't fetch weather. ${
    err?.message || "Something went wrong."
  }`;

  const hint = document.createElement("p");
  hint.className = "muted";
  hint.textContent = "Check the city name or try again.";

  wrapper.appendChild(msg);
  wrapper.appendChild(hint);
  container.appendChild(wrapper);
}
