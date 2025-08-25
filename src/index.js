import "./styles.css";
import { renderApp } from "./modules/dom";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  renderApp(app);
});
