const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const taskTextInput = document.querySelector(".taskText");
const taskAdderColorsContainer = document.querySelector(".priotityColors2");
const taskAdderColors = document.querySelectorAll(".color2");
const taskContainer = document.querySelector(".taskContainer");
const deleteButton = document.querySelector("#delete");
const filterColorContainer = document.querySelector(".priotityColors");
const allTicketButton = document.getElementById("all");
// console.log(taskTextInput);
let selectedColor = "red";
let isDeleteActive = false;
let taskArray = [];
let allColors = ["red", "blue", "green", "orange"];
const localStorageData = localStorage.getItem("taskArray");


const unlockIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>';
const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM10 15V17H14V15H10Z"></path></svg>';
// allTickets

allTicketButton.addEventListener("click", function () {
  createTicketAndAddTicketToUI();
});
// filtering logic  of tickets
filterColorContainer.addEventListener("click", function(event){
    const selectedElement = event.target;
    if(selectedElement.classList[0] !== "color")return;
    // console.log(selectedElement);
    let color = selectedElement.classList[1];
    // console.log(color);
    let filteredArray = taskArray.filter(function(obj){
        return obj.color == color;
    });
    createTicketAndAddTicketToUI(filteredArray);
});

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
  taskTextInput.focus();
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
  taskTextInput.focus();
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
        <p id = "pTag"  contentEdittable = false> ${task}</p>
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
        const taskText = ticketBox.querySelector("#pTag");
        let isEdittable = false;
        const editButtonContainer = ticketBox.querySelector(".lockContainer");
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

     // Edit Button functioanlity
    editButtonContainer.addEventListener("click", function () {
      if (isEdittable) {
        // go to lock State
        // editButtonContainer.innerHTML = lockIcon;
        taskText.setAttribute("contentEditable", "false");
        const newText = taskText.innerHTML;

        taskObj.task = newText;
         // Updating TaskArray
        updateTaskArrayInLocalStorage(taskArray);
      } else {
        // go to unlock State
        // editButtonContainer.innerHTML = unlockIcon;
        taskText.setAttribute("contentEditable", "true");
        taskText.focus();
      }
        isEdittable = !isEdittable;
    });
    taskContainer.appendChild(ticketBox);
});
}
function updateTaskArrayInLocalStorage(array = taskArray) {
  localStorage.setItem("taskArray", JSON.stringify(array));
}

/* doubt
1. local storage parse karte time waps se taskarray mein parse data ko kyu rakh rahe hai
2. lock unlock button hi gayab ho ja raha hai
*/
