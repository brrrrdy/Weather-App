export function createInitialUI() {
  // page container
  const pageContainer = document.createElement("div");
  pageContainer.className = "page-container";

  // header div
  const header = document.createElement("header");
  header.className = "app-header";

  // logo div
  const logo = document.createElement("div");
  logo.className = "app-logo";
  logo.textContent = "The Weather";

  // search bar div
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.className = "search-input";
  searchInput.type = "text";
  searchInput.placeholder = "Search for a city...";

  // Add elements to DOM
  searchContainer.appendChild(searchInput);
  header.appendChild(logo);
  header.appendChild(searchContainer);
  pageContainer.appendChild(header);

  return pageContainer;
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
