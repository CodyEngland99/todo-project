const taskAddBtn = document.getElementById("add-task");
const taskContainer = document.getElementById("task-inventory-container");
const taskItemBtn = document.getElementById("task-container");
const inputContainer = document.getElementById("input-container");
const deleteAll = document.querySelector(".delete-task");
const mainBody = document.getElementById("main-content-container");
const input = document.getElementById("input");
const filter = document.getElementById("filters-container");
const itemFilterBtn = document.querySelectorAll(".item");
let date = document.getElementById("date-picker");

function addTask(e) {
  let userDate = date.value;
  //getting value from user input
  const userInput = input.value;

  //creating all the html elemets for task
  const taskItemContainer = document.createElement("div");
  const leftTaskContainer = document.createElement("div");
  const trashCan = document.createElement("img");
  const starTask = document.createElement("img");
  const userTask = document.createElement("p");
  let addDate = document.createElement("p");
  const rightTaskContainer = document.createElement("div");

  //adding the classes to the elements
  taskItemContainer.classList.add("task-item", "all");
  leftTaskContainer.classList.add("left-side-task");
  trashCan.classList.add("task-delete-single", "item-pic");
  starTask.classList.add("starred-select", "item-pic");
  rightTaskContainer.classList.add("right-task-list");
  userTask.classList.add("user-task");
  addDate.classList.add("date");

  //adding transistion
  setTimeout(() => {
    taskItemContainer.classList.add("slide-in");
  }, 10);

  //adding the img soruce to the elements
  trashCan.src = "img/trash-can.png";
  starTask.src = "img/star-unfilled.png";

  //adding date
  const slicedDate = userDate.slice(-5);
  addDate.innerHTML = `${slicedDate}`;

  //adding all the js made elements to the html
  userTask.innerHTML = userInput;
  taskContainer.appendChild(taskItemContainer);
  taskItemContainer.appendChild(leftTaskContainer);
  taskItemContainer.appendChild(rightTaskContainer);
  leftTaskContainer.appendChild(trashCan);
  leftTaskContainer.appendChild(userTask);
  rightTaskContainer.appendChild(starTask);
  rightTaskContainer.appendChild(addDate);

  const valueDate = userDate.slice(-2);
  taskItemContainer.value = valueDate;
  //erasing the input field
  input.value = "";
}

function taskItems(e) {
  //pulling task item
  const taskItemContainer = document.querySelector(".task-item");

  //pulling elemt that is click
  const task = e.target;
  const parentDiv = task.parentNode.parentNode;
  if (task.classList.contains("task-delete-single")) {
    parentDiv.classList.add("slide-out");

    setTimeout(() => {
      parentDiv.remove(taskItemContainer);
    }, 300);
  } else if (
    task.classList.contains("starred-select") &&
    task.classList.contains("star-selected")
  ) {
    task.src = "img/star-unfilled.png";
    task.classList.remove("star-selected");
    parentDiv.classList.remove("starred");
    parentDiv.classList.add("all");
  } else if (task.classList.contains("starred-select")) {
    parentDiv.classList.remove("all");
    task.src = "img/star-filled.png";
    task.classList.add("star-selected", "starred");
    parentDiv.classList.add("starred");
  }
}

function checkUser(e) {
  //getting the users input and triming extra spaces
  const userInput = document.getElementById("input").value.trim();

  //formats all elements into an array to check to see if pop up is already present
  let hasChildWithClass = Array.from(inputContainer.children).some(function (
    promt
  ) {
    return promt.classList.contains("promt");
  });

  //checks to see if users input is empty when submitted
  if (userInput === "") {
    const promtInput = document.createElement("p");

    if (hasChildWithClass) {
      return;
    } else {
      //sets prompt if user input is empty
      promtInput.classList.add("promt");
      promtInput.innerHTML = "*Please Enter A Task";
      inputContainer.appendChild(promtInput);
    }
  } else if (userInput !== "") {
    if (hasChildWithClass) {
      //if prompt is already present and input has informations subbmited it removes the prompt and runs addtask()
      const promtRemove = document.querySelector(".promt");
      promtRemove.remove();
      addTask();
    } else {
      addTask();
    }
  }
}

function deleteAllTask(e) {
  //creates a overlay and modal elements when deleting all task
  const overlayContainer = document.createElement("div");
  const modalContainer = document.createElement("div");
  const message = document.createElement("p");
  const btnConfirm = document.createElement("a");
  const btnCancel = document.createElement("a");

  //adding classes to modal and overlay elements
  overlayContainer.classList.add("overlay");
  modalContainer.classList.add("modal");
  btnConfirm.classList.add("btn", "confirm-delete");
  btnCancel.classList.add("btn", "negative-delete");

  //add elements to body
  mainBody.appendChild(overlayContainer);
  mainBody.appendChild(modalContainer);

  //adds text to elements
  message.innerHTML = "Do you want to delete all task?";
  btnConfirm.innerHTML = "Confirm";
  btnCancel.innerHTML = "Cancel";

  //add elements to body
  modalContainer.appendChild(message);
  modalContainer.appendChild(btnConfirm);
  modalContainer.appendChild(btnCancel);

  //listens for the confirm or cancel button for overlay
  btnConfirm.addEventListener("click", function () {
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }

    overlayContainer.remove(overlayContainer);
    modalContainer.remove(modalContainer);
  });

  btnCancel.addEventListener("click", function () {
    overlayContainer.remove(overlayContainer);
    modalContainer.remove(modalContainer);
    return;
  });
}

function filterItems(e) {
  let userDate = date.value;

  const filterTasks = e.target;

  const filterBtns = Array.from(itemFilterBtn).filter((itemFilterBtn) =>
    itemFilterBtn.classList.contains("selected-items")
  );

  filterBtns.forEach((itemFilterBtn) => {
    itemFilterBtn.classList.remove("selected-items");
  });

  if (filterTasks.classList.contains("item")) {
    filterTasks.classList.add("selected-items");
  }

  //FILTER

  if (
    filterTasks.classList.contains("star") ||
    filterTasks.classList.contains("all") ||
    filterTasks.classList.contains("today") ||
    filterTasks.classList.contains("week")
  ) {
    let parentDiv = document.getElementById("task-inventory-container");

    let childDivsWithClassName = parentDiv.querySelectorAll(".task-item");

    childDivsWithClassName.forEach(function (childDiv) {
      if (filterTasks.classList.contains("all")) {
        if (
          childDiv.classList.contains("all") ||
          childDiv.classList.contains("starred")
        ) {
          childDiv.style.display = "flex";
        }
      }

      if (filterTasks.classList.contains("star")) {
        if (childDiv.classList.contains("all")) {
          childDiv.style.display = "none";
        }
      }

      if (filterTasks.classList.contains("today")) {
        let userDate = childDiv.value;
        let userValue = userDate.slice(-8);
		let current = new Date().toString();
		let currentDate = current.slice(8, 10)

        if(userValue == currentDate) {
			childDiv.style.display = "flex";
		} else {
			childDiv.style.display = "none";
		}
      }

      if (filterTasks.classList.contains("week")) {
        let start = getStartOfWeek();
        let end = getEndOfWeek();
      }
    });
  }
}

// date
function getStartOfWeek() {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let startOfWeek = new Date(today);

  let diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  startOfWeek.setDate(diff);

  return startOfWeek;
}

function getEndOfWeek() {
  let startOfWeek = getStartOfWeek();
  let endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return endOfWeek;
}

//event listeners
filter.addEventListener("click", filterItems);
taskAddBtn.addEventListener("click", checkUser);
taskItemBtn.addEventListener("click", taskItems);
deleteAll.addEventListener("click", deleteAllTask);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkUser();
  }
});
