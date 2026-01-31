import { createForm } from "./form.js";
import { createItems } from "./items.js";


function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

let items = getLocalStorage();
let editId = null;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null
  );

  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}

export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };

  items = [...items, newItem];
  setLocalStorage(items);
  render();

  setTimeout(() => alert("Item Added Successfully!"), 0);
}

export function editCompleted(itemId) {
  items = items.map((item) =>
    item.id === itemId
      ? { ...item, completed: !item.completed }
      : item
  );

  setLocalStorage(items);
  render();
}

export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();

  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}

export function setEditId(itemId) {
  editId = itemId;
  render();

  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) input.focus();
  }, 0);
}

export function updateItemName(newName) {
  items = items.map((item) =>
    item.id === editId ? { ...item, name: newName } : item
  );

  editId = null;
  setLocalStorage(items);
  render();

  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

render();
