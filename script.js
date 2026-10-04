const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const taskTextInput = document.querySelector(".taskText");
const taskAdderColorsContainer = document.querySelector(".priotityColors2");
const taskAdderColors = document.querySelectorAll(".color2");
// console.log(taskTextInput);
let selectedColor = "red";
let taskArray = [];
function hideTaskAdder(){
    taskAdderContainer.classList.toggle("hide");
}
addBtn.addEventListener("click",hideTaskAdder);

taskTextInput.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;
    // console.dir(taskTextInput);
    let taskText =taskTextInput.value.trim();
    taskTextInput.value = "";

    // console.log(taskText);
     
    if(taskText.length == 0){
        return;
    }
    hideTaskAdder();
    const taskObj = {
        id:Date.now(),
        task:taskText,
        color:selectedColor,
    }
    taskArray.push(taskObj);
    console.log(taskArray);
    createTicketAndAddTicketToUI(taskArray);
    
});


// ye colors ko select kar raha hai taskadder container ke side mein jo color hai
taskAdderColorsContainer.addEventListener("click",function(event){
    const selectedElement = event.target;
    // console.dir(selectedElement);
    // console.log("hihi");
    if(selectedElement.classList[0] !== "color2") return;
    const newSelectedColor = selectedElement.classList[1];
    selectedColor = newSelectedColor;

    taskAdderColors.forEach((element) =>{
        element.classList.remove("border");
    });
    selectedElement.classList.add("border");
    // console.log(newSelectedColor);
    
});

function createTicketAndAddTicketToUI(array = taskArray){
    
}