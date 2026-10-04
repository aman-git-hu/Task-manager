const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const taskTextInput = document.querySelector(".taskText");
const taskAdderColorsContainer = document.querySelector(".priotityColors2");
// console.log(taskTextInput);
let selectedColor = "red";
addBtn.addEventListener("click",function(){
    taskAdderContainer.classList.toggle("hide");
});

taskTextInput.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;
    // console.dir(taskTextInput);
    let taskText =taskTextInput.value.trim();
    // console.log(taskText);
     
    if(taskText.length == 0){
        return;
    }
    
});
taskAdderColorsContainer.addEventListener("click",function(event){
    const selectedElement = event.target;
    // console.dir(selectedElement);
    // console.log("hihi");
    if(selectedElement.classList[0] !== "color2") return;
    const newSelectedColor = selectedElement.classList[1];
    selectedColor = newSelectedColor;

    console.log(newSelectedColor);
    
});