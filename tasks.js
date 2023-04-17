function uid() {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
}

let taskData = [
  {
    id: uid(),
    name: "Crie uma nova tarefa",
    toDo: true,
  },
];

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const tasklist = document.getElementById("tasks_list");
const todoCounterText = document.getElementById("todo_count");
const doneCounterText = document.getElementById("done_count");
const emptyTasks = document.getElementById("empty_tasks");

// get tasks from sessionStorage
window.onload = savedTasks();

function savedTasks(){
  //check sessionStorage

  //return if sessionStorage empty
  if(sessionStorage.getItem('tasks') == null){  
    taskData.length = 0; 
    return;
  }

  // Tasks from sessionStorage in an array
  taskData = JSON.parse(sessionStorage.getItem('tasks'));
  console.log(taskData);
}

// empty tasks
function verifyIfListIsEmpty() {
  if (taskData.length === 0) {
    emptyTasks.classList.remove("hidden");
  } else {
    emptyTasks.classList.add("hidden");
  }

  sessionStorage.setItem("emptyTasks", emptyTasks.value);
}

function counter() {
  let toDoCounter = 0;
  let doneCounter = 0;

  toDoCounter = taskData.length;
  todoCounterText.innerHTML = `${toDoCounter}`;

  for (const task of taskData) {
    if (task.toDo === false) {
      doneCounter++;
    }
  }

  doneCounterText.innerText = `${doneCounter}`;

  sessionStorage.setItem("toDoCounter", todoCounterText.value);
  sessionStorage.setItem("doneCounter", doneCounterText.value);
}

verifyIfListIsEmpty();
counter();

function createNewTaskEl(taskName, taskId) {
  // create task li
  let task = document.createElement("li");
  task.classList.add("task");
  task.classList.add("todo");
  task.setAttribute("id", taskId);
  // crate .left_content div
  let leftContent = document.createElement("div");
  leftContent.classList.add("left_content");

  //todo icon
  let todoIcon = document.createElement("i");
  todoIcon.classList.add("ph-duotone");
  todoIcon.classList.add("ph-circle");
  todoIcon.classList.add("check_btn");
  todoIcon.addEventListener("click", completeTask);

  //done icon
  let doneIcon = document.createElement("i");
  doneIcon.classList.add("ph-duotone");
  doneIcon.classList.add("ph-check-circle");
  doneIcon.classList.add("check_btn");
  doneIcon.classList.add("hidden");
  doneIcon.addEventListener("click", incompleteTask);

  //task name /p
  let name = document.createElement("p");
  name.innerHTML = taskName;

  //delete icon
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("ph-duotone");
  deleteIcon.classList.add("ph-trash");
  deleteIcon.classList.add("delete_btn");
  deleteIcon.addEventListener("click", deleteTask);

  leftContent.appendChild(todoIcon);
  leftContent.appendChild(doneIcon);
  leftContent.appendChild(name);

  task.appendChild(leftContent);
  task.appendChild(deleteIcon);

  return task;
}

// add new task
function addTask(event) {
  event.preventDefault();
  console.log("Add Task");

  const newTaskName = addTaskInput.value;

  const newTask = {
    id: uid(),
    name: newTaskName,
    toDo: true,
  };

  taskData.push(newTask);

  sessionStorage.setItem("tasks", JSON.stringify(taskData));
  let savedTasks = JSON.parse(sessionStorage.getItem("tasks"));
console.log(savedTasks);

  const taskElement = createNewTaskEl(newTask.name, newTask.id);

  sessionStorage.setItem("tasklist", tasklist.appendChild(taskElement));

  addTaskInput.value = "";
  counter();
  verifyIfListIsEmpty();
  }


// complete task
function completeTask(event) {
  console.log("Complete Task");

  const todoIcon = event.target;
  todoIcon.classList.add("hidden");

  const text = todoIcon.parentNode.childNodes[2];
  text.classList.add("risked");

  const taskToCompletId = todoIcon.parentNode.parentNode.id;
  const taskToComplete = document.getElementById(taskToCompletId);

  taskToComplete.classList.add("done");
  taskToComplete.classList.remove("todo");

  const doneIcon = todoIcon.parentNode.childNodes[1];
  doneIcon.classList.remove("hidden");

  taskData.find((item) => {
    if (item.id === taskToCompletId) {
      item.toDo = false;
    }
  });

  sessionStorage.setItem("tasks", JSON.stringify(taskData));
  let savedTasks = JSON.parse(sessionStorage.getItem("tasks"));
console.log(savedTasks);

  counter();
}

// incomplete task
function incompleteTask(event) {
  console.log("Incomplete Task");

  const doneIcon = event.target;
  doneIcon.classList.add("hidden");

  const text = doneIcon.parentNode.childNodes[2];
  text.classList.remove("risked");

  const taskToIncompleteId = doneIcon.parentNode.parentNode.id;
  const taskToIncomplete = document.getElementById(taskToIncompleteId);

  taskToIncomplete.classList.add("todo");
  taskToIncomplete.classList.remove("done");

  const todoIcon = doneIcon.parentNode.childNodes[0];
  todoIcon.classList.remove("hidden");

  taskData.find((item) => {
    if (item.id === taskToIncompleteId) {
      item.toDo = true;
    }
  });

  sessionStorage.setItem("tasks", JSON.stringify(taskData));
  let savedTasks = JSON.parse(sessionStorage.getItem("tasks"));
console.log(savedTasks);

  counter();
}

// delete task
function deleteTask(event) {
  console.log("Delete Task");

  const taskToDeleteId = event.target.parentNode.id;
  const taskToDelete = document.getElementById(taskToDeleteId);

  const tasksWithoutDeletedOne = taskData.filter((task) => {
    return task.id !== taskToDeleteId;
  });

  taskData = tasksWithoutDeletedOne;
  tasklist.removeChild(taskToDelete);

  sessionStorage.setItem("tasks", JSON.stringify(taskData));
  let savedTasks = JSON.parse(sessionStorage.getItem("tasks"));
console.log(savedTasks);

  counter();
  verifyIfListIsEmpty();
}

// sync HTML with taskData list

for (const task of taskData) {

  function syncHTML(){
    const taskItem = createNewTaskEl(task.name, task.id);
    tasklist.appendChild(taskItem);
  }

  if (task.toDo == false){

    syncHTML();

    const taskId = document.getElementById(task.id);
    
    let todoIcon = taskId.childNodes[0].childNodes[0];
    todoIcon.classList.add("hidden");

    const text = taskId.childNodes[0].childNodes[2];
    text.classList.add("risked");

    const doneIcon = taskId.childNodes[0].childNodes[1];
    doneIcon.classList.remove("hidden");

    taskId.classList.add("done");
    taskId.classList.remove("todo");
  
  }else{
    syncHTML();
  }

}



