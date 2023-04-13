let taskData = [
  {
    id: 1,
    name: "Vê se eu tô na esquina",
    toDo: true,
  },
  {
    id: 2,
    name: "Dar banho nos gatos",
    toDo: false,
  },
];

const addTaskInput = document.getElementById("task_input");
const addTaskButton = document.getElementsByTagName("button")[0];
const tasklist = document.getElementById("tasks_list");

// add new task
function addTask(event) {
  event.preventDefault();
  console.log("Add Task");
}

// complete task
function completeTask(event) {
  console.log("Complete Task");
}

// incomplete task
function incompleteTask(event) {
  console.log("Incomplete Task");
}

// delete task
function deleteTask(event) {
  console.log("Delete Task");
}

// sync HTML with taskData list

// counter tasks
