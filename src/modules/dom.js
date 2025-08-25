// src/modules/dom.js
import { createInitialUI } from "./ui";
import { fetchWeather } from "./api";

export function renderApp(rootEl) {
  const ui = createInitialUI();
  rootEl.appendChild(ui.pageContainer);

  // Wire search events
  ui.searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    const query = e.target.value.trim();
    if (!query) return;
    await handleSearch(query, ui.results);
  });
}

// --- helpers ---
async function handleSearch(city, mountPoint) {
  setLoading(mountPoint, `Loading ${city}...`);
  try {
    const data = await fetchWeather(city);
    renderWeather(mountPoint, data);
  } catch (err) {
    renderError(mountPoint, err);
  }
}

function clearChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
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

function renderWeather(container, data) {
  clearChildren(container);

  const loc = data?.resolvedAddress || data?.address || "Unknown location";
  const current = data?.currentConditions || data?.days?.[0] || {};
  const temp = current.temp != null ? Math.round(current.temp) : "—";
  const feels = current.feelslike != null ? Math.round(current.feelslike) : "—";
  const humidity =
    current.humidity != null ? Math.round(current.humidity) : "—";
  const precipProb =
    current.precipprob != null ? Math.round(current.precipprob) : "—";
  const description = current.conditions || current.icon || "—";

  // card
  const card = document.createElement("article");
  card.className = "weather-card";

  // header
  const header = document.createElement("header");
  header.className = "weather-header";

  const city = document.createElement("h2");
  city.className = "city";
  city.textContent = loc;

  const desc = document.createElement("span");
  desc.className = "description";
  desc.textContent = description;

  header.appendChild(city);
  header.appendChild(desc);

  // grid
  const grid = document.createElement("div");
  grid.className = "weather-grid";

  const bigTemp = document.createElement("div");
  bigTemp.className = "big-temp";

  const tempValue = document.createElement("span");
  tempValue.className = "value";
  tempValue.textContent = temp;

  const unit = document.createElement("span");
  unit.className = "unit";
  unit.textContent = "°C";

  bigTemp.appendChild(tempValue);
  bigTemp.appendChild(unit);

  const metrics = document.createElement("ul");
  metrics.className = "metrics";

  const feelsItem = createMetric("Feels like", `${feels}°`);
  const humItem = createMetric("Humidity", `${humidity}%`);
  const rainItem = createMetric("Chance of rain", `${precipProb}%`);

  metrics.appendChild(feelsItem);
  metrics.appendChild(humItem);
  metrics.appendChild(rainItem);

  grid.appendChild(bigTemp);
  grid.appendChild(metrics);

  // assemble
  card.appendChild(header);
  card.appendChild(grid);
  container.appendChild(card);
}

function createMetric(labelText, valueText) {
  const li = document.createElement("li");

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = labelText;

  const value = document.createElement("span");
  value.className = "value";
  value.textContent = valueText;

  li.appendChild(label);
  li.appendChild(value);
  return li;
}
