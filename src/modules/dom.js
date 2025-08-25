import { createInitialUI } from "./ui";
import { fetchWeather } from "./api";
import { createUnitSwitcher } from "./unitSwitcher";

export function renderApp(rootEl) {
  const ui = createInitialUI();
  rootEl.appendChild(ui.pageContainer);

  let unitSwitcherInstance;

  ui.searchInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    const city = e.target.value.trim();
    if (!city) return;

    // determine unit for search

    const currentUnit = unitSwitcherInstance
      ? unitSwitcherInstance.getCurrentUnit()
      : "metric";

    await handleSearch(city, ui.results, currentUnit);

    // add unit switcher after first search

    if (!unitSwitcherInstance) {
      unitSwitcherInstance = createUnitSwitcher(ui.main, async (c, u) => {
        await handleSearch(c, ui.results, u);
      });
    }

    // set current city and sync button states

    unitSwitcherInstance.setCurrentCity(city, currentUnit);
  });
}

// handle search and render weather

async function handleSearch(city, mountPoint, unit) {
  setLoading(mountPoint, `Loading ${city}...`);
  try {
    const data = await fetchWeather(city, unit);
    renderWeather(mountPoint, data, unit);
  } catch (err) {
    renderError(mountPoint, err);
  }
}

// helpers

function renderWeather(container, data, currentUnit) {
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
  const unitLabel = currentUnit === "metric" ? "°C" : "°F";

  const card = document.createElement("article");
  card.className = "weather-card";

  const header = document.createElement("header");
  header.className = "weather-header";

  const cityEl = document.createElement("h2");
  cityEl.className = "city";
  cityEl.textContent = loc;

  const descEl = document.createElement("span");
  descEl.className = "description";
  descEl.textContent = description;

  header.appendChild(cityEl);
  header.appendChild(descEl);

  const grid = document.createElement("div");
  grid.className = "weather-grid";

  const bigTemp = document.createElement("div");
  bigTemp.className = "big-temp";

  const tempValue = document.createElement("span");
  tempValue.className = "value";
  tempValue.textContent = temp;

  const unitEl = document.createElement("span");
  unitEl.className = "unit";
  unitEl.textContent = unitLabel;

  bigTemp.appendChild(tempValue);
  bigTemp.appendChild(unitEl);

  const metrics = document.createElement("ul");
  metrics.className = "metrics";

  metrics.appendChild(createMetric("Feels like", `${feels}${unitLabel}`));
  metrics.appendChild(createMetric("Humidity", `${humidity}%`));
  metrics.appendChild(createMetric("Chance of rain", `${precipProb}%`));

  grid.appendChild(bigTemp);
  grid.appendChild(metrics);

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
