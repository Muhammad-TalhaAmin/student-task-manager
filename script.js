"use strict";

const STORAGE_KEY = "student-task-manager-tasks-v1";
const SEARCH_DEBOUNCE_MS = 250;

const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const descriptionInput = document.querySelector("#taskDescription");
const titleError = document.querySelector("#titleError");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const emptyHeading = document.querySelector("#emptyHeading");
const emptyDescription = document.querySelector("#emptyDescription");
const taskSearch = document.querySelector("#taskSearch");
const clearSearchButton = document.querySelector("#clearSearch");
const resultCount = document.querySelector("#resultCount");
const storageStatus = document.querySelector("#storageStatus");
const filterButtons = document.querySelectorAll(".filter-button");

let activeFilter = "all";
let searchTerm = "";
let searchTimeoutId;
let fallbackIdCounter = 0;

const loadedTasks = loadTasks();
let tasks = loadedTasks.tasks;

if (loadedTasks.error) {
  storageStatus.textContent = loadedTasks.error;
}

renderTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

titleInput.addEventListener("input", () => {
  if (titleInput.value.trim()) {
    clearTitleError();
  }
});

taskSearch.addEventListener("input", () => {
  clearSearchButton.hidden = taskSearch.value.length === 0;
  window.clearTimeout(searchTimeoutId);
  searchTimeoutId = window.setTimeout(() => {
    searchTerm = taskSearch.value.trim().toLocaleLowerCase();
    renderTasks();
  }, SEARCH_DEBOUNCE_MS);
});

clearSearchButton.addEventListener("click", () => {
  window.clearTimeout(searchTimeoutId);
  taskSearch.value = "";
  searchTerm = "";
  clearSearchButton.hidden = true;
  renderTasks();
  taskSearch.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    syncSearch();
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTasks();
  });
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[data-action="toggle"]');
  if (!checkbox || !taskList.contains(checkbox)) {
    return;
  }

  toggleTask(checkbox.dataset.taskId);
});

taskList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest('button[data-action="delete"]');
  if (!deleteButton || !taskList.contains(deleteButton)) {
    return;
  }

  deleteTask(deleteButton.dataset.taskId);
});

function addTask() {
  const title = titleInput.value.trim();
  if (!title) {
    showTitleError("Enter a task title before adding it.");
    titleInput.focus();
    return;
  }

  syncSearch();
  clearTitleError();
  tasks.unshift({
    id: createTaskId(),
    title,
    description: descriptionInput.value.trim(),
    completed: false
  });

  saveTasks();
  renderTasks();
  taskForm.reset();
  titleInput.focus();
}

function toggleTask(taskId) {
  syncSearch();
  const task = tasks.find((item) => item.id === taskId);
  if (!task) {
    return;
  }

  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  syncSearch();
  const remainingTasks = tasks.filter((task) => task.id !== taskId);
  if (remainingTasks.length === tasks.length) {
    return;
  }

  tasks = remainingTasks;
  saveTasks();
  renderTasks();
}

function filterTasks() {
  return tasks.filter((task) => {
    const matchesStatus = activeFilter === "all"
      || (activeFilter === "completed" && task.completed)
      || (activeFilter === "pending" && !task.completed);
    const searchableText = `${task.title} ${task.description}`.toLocaleLowerCase();
    return matchesStatus && (!searchTerm || searchableText.includes(searchTerm));
  });
}

function renderTasks() {
  const visibleTasks = filterTasks();
  const fragment = document.createDocumentFragment();

  visibleTasks.forEach((task) => {
    fragment.append(createTaskCard(task));
  });

  taskList.replaceChildren(fragment);
  resultCount.textContent = `Showing ${visibleTasks.length} of ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;

  const hasNoTasks = tasks.length === 0 && !searchTerm && activeFilter === "all";
  emptyMessage.hidden = visibleTasks.length > 0;
  if (hasNoTasks) {
    emptyHeading.textContent = "Nothing here just yet";
    emptyDescription.textContent = "Add a task above and it will show up here.";
  } else {
    emptyHeading.textContent = "No matching tasks";
    emptyDescription.textContent = "Try another search or status filter.";
  }
}

function createTaskCard(task) {
  const listItem = document.createElement("li");
  listItem.className = `task-card${task.completed ? " is-completed" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.action = "toggle";
  checkbox.dataset.taskId = task.id;
  checkbox.setAttribute("aria-label", `${task.completed ? "Mark as pending" : "Mark as completed"}: ${task.title}`);

  const content = document.createElement("div");
  content.className = "task-content";

  const topline = document.createElement("div");
  topline.className = "task-topline";

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;
  topline.append(title);

  if (task.completed) {
    const badge = document.createElement("span");
    badge.className = "task-badge";
    badge.textContent = "Completed";
    topline.append(badge);
  }

  content.append(topline);
  if (task.description) {
    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description;
    content.append(description);
  }

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.taskId = task.id;
  deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
  deleteButton.title = "Delete task";
  deleteButton.textContent = "\u00D7";

  listItem.append(checkbox, content, deleteButton);
  return listItem;
}

function loadTasks() {
  try {
    const storedTasks = window.localStorage.getItem(STORAGE_KEY);
    if (storedTasks === null) {
      return { tasks: [], error: "" };
    }

    const parsedTasks = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks)) {
      throw new TypeError("Saved task data is not a list.");
    }

    const validTasks = parsedTasks
      .filter((task) => task
        && typeof task.id === "string"
        && typeof task.title === "string")
      .map((task) => ({
        id: task.id,
        title: task.title,
        description: typeof task.description === "string" ? task.description : "",
        completed: task.completed === true
      }));

    return { tasks: validTasks, error: "" };
  } catch {
    return {
      tasks: [],
      error: "Saved tasks could not be loaded. Your existing saved data has not been changed."
    };
  }
}

function saveTasks() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageStatus.textContent = "";
  } catch {
    storageStatus.textContent = "Changes are visible, but could not be saved in this browser.";
  }
}

function syncSearch() {
  window.clearTimeout(searchTimeoutId);
  searchTerm = taskSearch.value.trim().toLocaleLowerCase();
  clearSearchButton.hidden = taskSearch.value.length === 0;
}

function createTaskId() {
  if (typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  let id;
  do {
    fallbackIdCounter += 1;
    id = `task-${Date.now()}-${fallbackIdCounter}`;
  } while (tasks.some((task) => task.id === id));
  return id;
}

function showTitleError(message) {
  titleError.textContent = message;
  titleInput.setAttribute("aria-invalid", "true");
}

function clearTitleError() {
  titleError.textContent = "";
  titleInput.removeAttribute("aria-invalid");
}
