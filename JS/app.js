import { groceryItems } from "JS/data.js";
import { createItems } from "JS/items.js";

let items = groceryItems;

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const itemsElement = createItems(items);
  app.appendChild(itemsElement);
}
render();