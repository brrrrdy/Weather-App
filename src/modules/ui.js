// Create initial UI with search bar
export function createInitialUI() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  // Header
  const header = document.createElement("header");
  header.className = "app-header";

  const logo = document.createElement("div");
  logo.className = "app-logo";
  logo.textContent = "The Weather";

  // Search container
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.type = "text";
  searchInput.placeholder = "Search for a city...";

  searchContainer.appendChild(searchInput);
  header.appendChild(logo);
  header.appendChild(searchContainer);

  // Main content
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

// Factory function to create the unit switcher dynamically

export function createUnitSwitcher() {
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

  return { switcher, cBtn, fBtn };
}
