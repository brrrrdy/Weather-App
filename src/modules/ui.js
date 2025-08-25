export function createInitialUI() {
  // page container
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  // header
  const header = document.createElement("header");
  header.className = "app-header";

  // logo

  const logo = document.createElement("div");
  logo.className = "app-logo";
  logo.textContent = "The Weather";

  // search

  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.type = "text";
  searchInput.placeholder = "Search for a city...";

  searchContainer.appendChild(searchInput);
  header.appendChild(logo);
  header.appendChild(searchContainer);

  // main content container
  const main = document.createElement("main");
  main.className = "app-main";

  // results container
  const results = document.createElement("div");
  results.className = "results";

  // default placeholder
  const placeholder = document.createElement("p");
  placeholder.className = "muted";
  results.appendChild(placeholder);

  main.appendChild(results);

  // assemble page
  pageContainer.appendChild(header);
  pageContainer.appendChild(main);

  // return references needed by dom.js
  return { pageContainer, searchInput, results };
}

//  UI Tree page container

//       -  home header ✅
//             - search location ✅
//             - logo ✅
//         - main content
//             - current weather image
//             - temp
//             - feels like
//               - feels like header
//               - feels like temp
//             - humidity
//               - humidity header
//               - humidity percentage
//             - chance of rain
//               - chance of rain header
//               - chance of rain percentage
//             - unit switcher
//               - c
//               - f
//         - footer
