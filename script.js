const addBtn = document.querySelector("#add");
const taskAdderContainer = document.querySelector(".taskAdder");
addBtn.addEventListener("click",function(){
    taskAdderContainer.classList.toggle("hide");
});