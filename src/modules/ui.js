// create initial UI with search bar

export function createInitialUI() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  // header

  const header = document.createElement("header");
  header.className = "app-header";

  const logo = document.createElement("div");
  logo.className = "app-logo";
  logo.textContent = "The Weather";

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
