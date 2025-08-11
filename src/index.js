import { createInitialUI } from "./modules/ui";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(createInitialUI());
});
