const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
const taskTextInput = document.querySelector(".taskText");
// console.log(taskTextInput);
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
    
})