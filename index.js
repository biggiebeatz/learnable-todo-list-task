const addBtn = document.querySelector("#add-btn");
const inputElement = document.getElementById('new-task');
const errorMessage = document.querySelector('.error');
const countValue = document.querySelector('.count-value');
const taskContainer = document.querySelector('.task-remaining')

let taskCount = 0;

const displayCount = (taskCount)=>{
  countValue.innerText = taskCount;
};
const addTask = ()=>{
  const taskName = inputElement.value.trim()
  errorMessage.style.display = "none";
  if(!taskName){
    setTimeout(()=>{
  errorMessage.style.display = "block";
    }, 200)
    return
  }
  const task = `<div class="task">
    <input type="checkbox" class="check-box">
    <span class="taskname">${taskName}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  </div>`
  taskContainer.insertAdjacentHTML("beforeend", task);


  const deleteBtn = document.querySelectorAll('.delete');
  deleteBtn.forEach((btn)=>{
    btn.onclick = ()=>{
      btn.parentNode.remove()
      taskCount -= 1;
      displayCount(taskCount)
    }
  })
  const editBtn = document.querySelectorAll('.edit');
  editBtn.forEach((button)=>{
    button.onclick = (e)=>{
      let targetElement = e.target;
      if(!(e.target.className == 'edit')){
        targetElement = e.target.parentElement;
      }
      inputElement.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1 ;
      displayCount(taskCount)
    }
  })
  const taskCheck = document.querySelectorAll('.check-box');
  taskCheck.forEach((checkbox)=>{
    checkbox.onchange = ()=>{
      checkbox.nextElementSibling.classList.toggle('completed');
     console.log( checkbox.nextElementSibling)
      
    }
  })
taskCount += 1
displayCount(taskCount)
inputElement.value = '';

window.onload = ()=>{
  taskCount = 0
  displayCount(taskCount)
  inputElement.value = '';
}
};
addBtn.addEventListener("click", addTask)