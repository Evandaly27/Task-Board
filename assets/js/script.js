// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
if (!nextId) {
    nextId = 1;
} else {
    nextId++
}
localStorage.setItem("nextId", JSON.stringify(nextId));
return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return `
    <div class="card mb-2 task-card" data-task-id="${task.id}"
    <div class="card-body">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.description}</p>
    <p class="text-muted">Due: ${task.dueDate}</p>
    <button class=btn btn-danger delete-task-btn">Delete</button>
    </div>
    </div>
    `;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (!taskList) {
        taskList = [];
    }

    ['to-do', 'in-progress', 'done'].forEach(status => {
        $(`#${status}-cards`).empty();
        taskList.filter(task => task.status === status).forEach(task => {
            $(`#${status}-cards`).append(createTaskCard(task));
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const title = $('#taskTitle').val().trim();
    const description = $('#taskDescription').val().trim();
    const dueDate = $('#taskDueDate').val().trim();

    const newTask = {
        id: generateTaskId(),
        title,
        description,
        dueDate,
        status: 'to-do'
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
