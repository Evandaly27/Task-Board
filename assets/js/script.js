// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return `
        <div class="card mb-2 task-card" data-task-id="${task.id}">
        <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="text-muted">Due: ${task.dueDate}</p>
        <button class="btn btn-danger delete-task-btn">Delete</button>
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
            const taskCard = createTaskCard(task);
            $(`#${status}-cards`).append(taskCard);
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
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
    window.localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
    $('#formModal').modal('hide');

}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    if (!$(event.target).hasClass('delete-task-btn')) return;

    const taskId = $(event.target).closest('.task-card').data('task-id');
    taskList = taskList.filter(task => task.id !== taskId);
    window.localStorage.setItem("tasks", JSON.stringify(taskList));


    renderTaskList();
}




// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = $(ui.item).data('task-id');
    const newStatus = $(ui.item).closest('.lane').attr('id').replace('-cards', '');

    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    taskList = taskList || [];

    nextId = nextId || 1;
    
    renderTaskList();
    $(document).on('submit', '#taskForm', handleAddTask);

    $(document).on('click', '.delete-task-btn', handleDeleteTask);

    // $('#taskForm').on('submit', handleAddTask);
    // $(document).on('click', '.delete-task-btn', handleDeleteTask);

    $('.lane').droppable({
        drop: handleDrop

    });

    $('#taskDueDate').datepicker();

});
