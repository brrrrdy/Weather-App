import { fetchWeather } from "./api";

// track currently displayed unit

let currentUnit = "metric";
export function createUnitSwitcher(container, city, updateWeatherCallback) {
  const switcher = document.createElement("div");
  switcher.className = "unit-switcher";

  const cBtn = document.createElement("button");
  cBtn.className = "unit-btn active";
  cBtn.textContent = "°C";
  cBtn.dataset.unit = "metric";

  const fBtn = document.createElement("button");
  fBtn.className = "unit-btn";
  fBtn.textContent = "°F";
  fBtn.dataset.unit = "us";

  switcher.appendChild(cBtn);
  switcher.appendChild(fBtn);

  // wire events

  cBtn.addEventListener("click", async () => {
    if (currentUnit === "metric") return;
    currentUnit = "metric";
    cBtn.classList.add("active");
    fBtn.classList.remove("active");
    if (city) updateWeatherCallback(city, currentUnit);
  });

  fBtn.addEventListener("click", async () => {
    if (currentUnit === "us") return;
    currentUnit = "us";
    fBtn.classList.add("active");
    cBtn.classList.remove("active");
    if (city) updateWeatherCallback(city, currentUnit);
  });

  container.appendChild(switcher);

  return {
    switcher,
    cBtn,
    fBtn,
    getCurrentUnit: () => currentUnit,
    setCurrentCity: (newCity) => (city = newCity),
  };
}
