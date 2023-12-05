//////////////////////////// variables ////////////////////////////
// get input element and container
let todoInputContainer = document.querySelector('.todo-input');
let todoInput = document.querySelector('.todo-input .input input');
// get add task button
let addTodoBtn = document.querySelector('.todo-input .add-task');
// get tasks container
let todoContainer = document.querySelector('.todo-content');
// get tasks count
let todoCnt = document.querySelector('.task-counter span');
// get clear completed tasks button
let clearCompletedBtn = document.querySelector('.clear-completed');
// get filter buttons
let allBtn = document.querySelector('.all-tasks');
let activeBtn = document.querySelector('.active-tasks');
let completedBtn = document.querySelector('.completed-tasks');

// get active tasks and completed tasks count
let activeTasksCnt = document.querySelector('.active-tasks p span');
let completedTasksCnt = document.querySelector('.completed-tasks p span');

// get theme switcher
let themeSwitcher = document.querySelector('.theme-switch');

// get body
let body = document.querySelector('body');


// get main background
let mainBg = document.querySelector('.mainBack');

// get footer
let todoFooter = document.querySelector('.todo-footer');

//////////////////////////// functions ////////////////////////////







// focus on input field on body load
window.onload = function() {
    todoInput.focus();
};

let tasks;

// add task function
function addTask() {
    // check if input is empty
    if (todoInput.value === '') {
        // show no tasks message
        noTasksMsg.classList.add('show');
    } else {
        let noTasksMsg = document.querySelector('.no-tasks-msg');

        // remove no tasks message
        if (document.body.contains(document.querySelector('.no-tasks-msg'))) {
            noTasksMsg.remove();
        }


        // create check icon
        let checkIcon = document.createElement('img')

        // create main p element
        let task = document.createElement('p');

        // create delete button
        let deleteBtn = document.createElement('i');

        // add task text to text node
        let taskText = document.createTextNode(todoInput.value);

        // add task text to task p element
        task.appendChild(taskText);


        // add check icon
        checkIcon.src = 'images/icon-check.svg';

        // add delete icon
        deleteBtn.classList = 'fa-solid fa-xmark delete-icon';


        // create task container
        let taskContainer = document.createElement('div');

        // add class to task container
        taskContainer.classList.add('todo-box');

        // create div for task and check icon
        let taskCheck = document.createElement('div');

        // add class to task and check icon
        taskCheck.classList.add('todo');

        //create div for check icon
        let checkDiv = document.createElement('div');

        // add class to check icon div
        checkDiv.classList.add('check-icon');

        // append check icon to check icon div
        checkDiv.appendChild(checkIcon);

        // append task and check icon to todo div
        taskCheck.appendChild(checkDiv);
        taskCheck.appendChild(task);

        // append task and check icon to task container
        taskContainer.appendChild(taskCheck);


        // append delete icon to task container
        taskContainer.appendChild(deleteBtn);

        // append todo-box to tasks container
        todoContainer.appendChild(taskContainer);

        // add task to local storage
        addTasksToLocalStorage();


        tasksCount();
        countActiveAndCompletedTasks();



        // clear input field
        todoInput.value = '';

        // focus on input field
        todoInput.focus();
    }

    if (completedBtn.classList.contains('active')) {
        // If so, switch to the all tasks button
        handleFilterClick(allBtn);
        showAllTasks();
    }
}


// delete task function
document.addEventListener('click', function(e) {
    if (e.target.className == 'fa-solid fa-xmark delete-icon') {
        e.target.parentNode.remove();
        // show no tasks message if tasks container is empty
        if (todoContainer.childElementCount == 0) {
            createNoTasksMsg();
        }
        tasksCount();
    } else if (e.target.className == 'check-icon') {
        e.target.classList.add('active');
        e.target.parentNode.parentNode.classList.add('completed');
        tasksCount();
    } else if (e.target.className == 'check-icon active') {
        e.target.classList.remove('active');
        e.target.parentNode.parentNode.classList.remove('completed');
        tasksCount();
    }

    countActiveAndCompletedTasks();

});

// add task on click and enter
addTodoBtn.onclick = addTask;
todoInput.onkeyup = function(e) {
    if (e.keyCode === 13) {
        addTask();
    }
};

// get tasks count

function tasksCount() {
    todoCnt.innerHTML = document.querySelectorAll('.todo-box').length;
}

// create no tasks message
function createNoTasksMsg() {
    let msgSpan = document.createElement('span');
    let msgText = document.createTextNode('No Tasks To Show');
    msgSpan.appendChild(msgText);
    msgSpan.classList.add('no-tasks-msg');
    todoContainer.appendChild(msgSpan);
}




// shuffle tasks
function showAllTasks() {
    let tasks = Array.from(document.querySelectorAll('.todo-box'));
    tasks.forEach((task) => {
        task.style.display = 'flex';
    });


}

function showActiveTasks() {
    let tasks = Array.from(document.querySelectorAll('.todo-box'));


    tasks.forEach((task) => {
        if (task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });

}

function showCompletedTasks() {

    let tasks = Array.from(document.querySelectorAll('.todo-box'));
    tasks.forEach((task) => {
        if (task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    if (todoContainer.childElementCount == 0) {
        createNoTasksMsg();
    } else if (todoContainer.childElementCount == 1) {
        document.querySelector('.no-tasks-msg').remove();
    }

}

// clear completed tasks

function clearCompletedTasks() {
    let tasks = Array.from(document.querySelectorAll('.todo-box'));
    tasks.forEach((task) => {
        if (task.classList.contains('completed')) {
            task.remove();
        }
    });
    if (todoContainer.childElementCount == 0) {
        createNoTasksMsg();
    }
    tasksCount();
}

// function to remove active class from all buttons
function removeActiveClass() {
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
}

// function to add active class to the selected button
function addActiveClass(btn) {
    btn.classList.add('active');
}

// function to handle filter button click
function handleFilterClick(btn) {
    removeActiveClass();
    addActiveClass(btn);
}

// add event listeners to filter buttons
allBtn.addEventListener('click', function() {
    handleFilterClick(allBtn);
    showAllTasks();
    countActiveAndCompletedTasks();
});

activeBtn.addEventListener('click', function() {
    handleFilterClick(activeBtn);
    showActiveTasks();
    countActiveAndCompletedTasks();
});

completedBtn.addEventListener('click', function() {
    handleFilterClick(completedBtn);
    showCompletedTasks();
    countActiveAndCompletedTasks();
});

// add event listener to clear completed tasks button
clearCompletedBtn.onclick = clearCompletedTasks;

// add tasks to the local storage
function addTasksToLocalStorage() {
    let tasks = Array.from(document.querySelectorAll('.todo-box'));
    tasks.forEach((task) => {
        window.localStorage.setItem('task', task.innerHTML);
    });
}




// count active and completed tasks
function countActiveAndCompletedTasks() {
    let activeTasks = Array.from(document.querySelectorAll('.todo-box:not(.completed)'));
    let completedTasks = Array.from(document.querySelectorAll('.todo-box.completed'));
    activeTasksCnt.innerHTML = activeTasks.length;
    completedTasksCnt.innerHTML = completedTasks.length;
}


// handle theme switcher click
themeSwitcher.addEventListener('click', function() {
    if (lightTheme.classList.contains('active')) {
        lightTheme.classList.remove('active');
        darkTheme.classList.add('active');
        body.classList.add('dark-theme');
    } else {
        darkTheme.classList.remove('active');
        lightTheme.classList.add('active');
        body.classList.remove('dark-theme');
    }
});

// handle theme switcher on checked 

// get input element of type checkbox
let themeSwitcherInput = document.querySelector('.theme-switch input');

// add event listener to theme switcher input
themeSwitcherInput.addEventListener('change', function() {
    let tasks = Array.from(document.querySelectorAll('.todo-box'));
    let taskText = Array.from(document.querySelectorAll('.todo-box .todo p'));
    if (themeSwitcherInput.checked) {
        mainBg.style.backgroundImage = 'url("../images/bg-desktop-light.jpg")';
        body.style.backgroundColor = 'hsl(236, 33%, 92%)';
        todoInput.style.backgroundColor = 'hsl(0, 0%, 98%)';
        todoInput.style.color = 'hsl(235, 19%, 35%)';
        todoInputContainer.style.backgroundColor = 'hsl(0, 0%, 98%)';
        todoContainer.style.backgroundColor = 'hsl(0, 0%, 98%)';
        taskText.forEach((text) => {
            text.style.color = 'hsl(235, 19%, 35%)';
        });
        tasks.forEach((task) => {
            task.style.backgroundColor = 'hsl(0, 0%, 98%)';
        });

        todoFooter.style.backgroundColor = 'hsl(0, 0%, 98%)';

    } else {
        mainBg.style.backgroundImage = 'url("../images/bg-desktop-dark.jpg")';
        body.style.backgroundColor = 'hsl(235, 21%, 11%)';
        todoInput.style.backgroundColor = 'hsl(235, 24%, 19%)';
        todoInput.style.color = 'hsl(234, 39%, 85%)';
        todoInputContainer.style.backgroundColor = 'hsl(235, 24%, 19%)';
        todoContainer.style.backgroundColor = 'hsl(235, 24%, 19%)';
        taskText.forEach((text) => {
            text.style.color = 'hsl(234, 39%, 85%)';
        });
        tasks.forEach((task) => {
            task.style.backgroundColor = 'hsl(235, 24%, 19%)';
        });
        todoFooter.style.backgroundColor = 'hsl(235, 24%, 19%)';


    }
});