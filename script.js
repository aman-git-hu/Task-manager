const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const taskTextInput = document.querySelector(".taskText");
const taskAdderColorsContainer = document.querySelector(".priotityColors2");
const taskAdderColors = document.querySelectorAll(".color2");
const taskContainer = document.querySelector(".taskContainer");
const deleteButton = document.querySelector("#delete");
// console.log(taskTextInput);
let selectedColor = "red";
let isDeleteActive = false;
let taskArray = [];
let allColors = ["red", "blue", "green", "orange"];
const localStorageData = localStorage.getItem("taskArray");

deleteButton.addEventListener("click", function () {
  if (isDeleteActive) {
    deleteButton.setAttribute("fill", "black");
  } else {
    deleteButton.setAttribute("fill", "red");
  }
  isDeleteActive = !isDeleteActive;
});
if (localStorageData) {
  const parsedData = JSON.parse(localStorageData);
  // console.log(parsedData);
  taskArray = parsedData;
  createTicketAndAddTicketToUI(taskArray);
}

function hideTaskAdder() {
  taskAdderContainer.classList.toggle("hide");
}
addBtn.addEventListener("click", hideTaskAdder);

// key press hone par kya kya hoga
taskTextInput.addEventListener("keydown", function (event) {
  if (event.key !== "Enter") return;
  // console.dir(taskTextInput);
  let taskText = taskTextInput.value.trim();
  taskTextInput.value = "";

  // console.log(taskText);

  if (taskText.length == 0) {
    return;
  }
  hideTaskAdder();
  const taskObj = {
    id: Date.now(),
    task: taskText,
    color: selectedColor,
  };
  taskArray.push(taskObj);
  // console.log(taskArray);
  updateTaskArrayInLocalStorage();
  createTicketAndAddTicketToUI(taskArray);
});

// ye colors ko select kar raha hai taskadder container ke side mein jo color hai
taskAdderColorsContainer.addEventListener("click", function (event) {
  const selectedElement = event.target;
  // console.dir(selectedElement);
  // console.log("hihi");
  if (selectedElement.classList[0] !== "color2") return;
  const newSelectedColor = selectedElement.classList[1];
  selectedColor = newSelectedColor;

  taskAdderColors.forEach((element) => {
    element.classList.remove("border");
  });
  selectedElement.classList.add("border");
  // console.log(newSelectedColor);
});

function createTicketAndAddTicketToUI(ticketArray = taskArray) {
  taskContainer.innerHTML = " ";
  ticketArray.forEach((taskObj) => {
    const { id, task, color } = taskObj;

    const ticketBox = document.createElement("div");
    ticketBox.classList.add("ticket");
    ticketBox.innerHTML = `<div class="taskColor ${color}"></div>
        <div class="ticketTaskContainer">
        <p id = "pTag" > ${task}</p>
          <div class="lockContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path
                d="M6 10V20H19V10H6ZM18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11H9V13H7V11ZM7 14H9V16H7V14ZM7 17H9V19H7V17Z"
              ></path>
            </svg>
          </div>
        </div>`;

    const taskColorElement = ticketBox.querySelector(".taskColor");
    taskColorElement.addEventListener("click", function () {
      console.log("taskcolor container click");
      let currentColor = taskColorElement.classList[1];
      console.log(currentColor);
      let currentColorIndex = allColors.indexOf(currentColor);
      let nextColor = allColors[(currentColorIndex + 1) % allColors.length];
      //ui update
      taskColorElement.classList.remove(currentColor);
      taskColorElement.classList.add(nextColor);
      console.log(nextColor);
      // data layer
      taskObj.color = nextColor;
    });
    ticketBox.addEventListener("dblclick", function () {
      if (!isDeleteActive) return;
      // Ui Layer
      taskContainer.removeChild(ticketBox);
      // Data Layer
      taskArray= taskArray.filter(function (obj) {
        return obj.id != taskObj.id;
      });
   
      //updating local storage
      updateTaskArrayInLocalStorage(taskArray);
    });
    taskContainer.appendChild(ticketBox);
  });
}

function updateTaskArrayInLocalStorage(array = taskArray) {
  localStorage.setItem("taskArray", JSON.stringify(array));
}

/* doubt
1. local storage parse karte time waps se taskarray mein parse data ko kyu rakh rahe hai
*/
