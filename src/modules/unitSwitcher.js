export function createUnitSwitcher(container, updateWeatherCallback) {
  let currentUnit = "metric";
  let currentCity = null;

  const switcher = document.createElement("div");
  switcher.className = "unit-switcher";

  const cBtn = document.createElement("button");
  cBtn.className = "unit-btn active";
  cBtn.textContent = "°C";

  const fBtn = document.createElement("button");
  fBtn.className = "unit-btn";
  fBtn.textContent = "°F";

  switcher.appendChild(cBtn);
  switcher.appendChild(fBtn);
  container.appendChild(switcher);

  const switchUnit = async (unit) => {
    if (currentUnit === unit) return;
    currentUnit = unit;
    cBtn.classList.toggle("active", unit === "metric");
    fBtn.classList.toggle("active", unit === "us");
    if (currentCity) {
      await updateWeatherCallback(currentCity, currentUnit);
    }
  };

  cBtn.addEventListener("click", () => switchUnit("metric"));
  fBtn.addEventListener("click", () => switchUnit("us"));

  return {
    setCurrentCity: (city, defaultUnit = "metric") => {
      currentCity = city;

      // reset unit and button states to defaultUnit

      currentUnit = defaultUnit;
      cBtn.classList.toggle("active", defaultUnit === "metric");
      fBtn.classList.toggle("active", defaultUnit === "us");
    },
    getCurrentUnit: () => currentUnit,
  };
}
