"use strict";
class createTask {
    titleInput = document.getElementById('todoTitle');
    descriptionInput = document.getElementById('todoDescription');
    dateInput = document.getElementById('todoDate');
    form = document.querySelector('#newTask');
    addBtn = document.getElementById('addBtn');
    updateBtn = document.getElementById('updateBtn');
    deleteBtn = document.getElementById('deleteBtn');
    alertMsg = document.getElementById('message');
    toDoId = "";
    constructor() {
        this.form.addEventListener('click', (e) => {
            e.preventDefault();
            // this.submitData()
        });
        this.addBtn.addEventListener('click', () => {
            this.submitData();
        });
        this.updateBtn.addEventListener('click', () => {
            this.updateToDo();
        });
        this.deleteBtn.addEventListener('click', () => {
            this.deleteAllTasks();
        });
    }
    submitData() {
        console.log(this.titleInput.value);
        const promise = new Promise((resolve, reject) => {
            console.log("Tumewasili");
            fetch('http://localhost:4000/toDo/newToDo', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.titleInput.value,
                    description: this.descriptionInput.value,
                    date: this.dateInput.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                resolve(data.json());
            }).catch(error => {
                reject(error);
            });
        });
        promise.then(data => {
            console.log(data.message);
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error';
            data.message ? this.alertMsg.innerText = data.message : data.error;
            setTimeout(() => {
                this.reset();
                location.reload();
            }, 2500);
        })
            .catch(error => {
            this.alertMsg.className = error.message ? 'msg-success' : 'msg-error';
            error.message ? this.alertMsg.innerText = error.message : error.error;
        });
    }
    editingInputs(id, title, description, date) {
        this.toDoId = id;
        this.titleInput.value = title;
        this.descriptionInput.value = description;
        this.dateInput.value = date;
    }
    updateToDo() {
        const update = new Promise(async (resolve, reject) => {
            fetch(`http://localhost:4000/toDo/${this.toDoId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: this.titleInput.value,
                    description: this.descriptionInput.value,
                    date: this.dateInput.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                resolve(res.json());
            })
                .catch(error => {
                error.message;
            });
        });
        update.then(data => {
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error';
            data.message ? this.alertMsg.innerText = data.message : data.error;
            setTimeout(() => {
                this.reset();
                location.reload();
            }, 2500);
        });
    }
    deleteAllTasks() {
        new Promise(async (resolve, reject) => {
            await fetch('http://localhost:4000/toDo/deleteTasks/', {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((response) => {
                console.log(response.message);
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error';
                response.message ? this.alertMsg.innerText = response.message : response.error;
                setTimeout(() => {
                    location.reload();
                }, 2500);
            })
                .catch(error => {
                reject(error.message);
            });
        });
    }
    reset() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.dateInput.value = '';
        this.alertMsg.innerText = '';
    }
}
class TaskHandler {
    onGoingTaskContainerElement = document.getElementById('tasksContainer');
    completedTaskContainerElement = document.getElementById('completed-tasks');
    todoMsg = document.getElementById('noData');
    todoCompletedMsg = document.getElementById('completedData');
    alertMsg = document.getElementById('message');
    constructor() { }
    async getAllTasks() {
        let noData;
        new Promise(async (resolve, reject) => {
            console.log("Arrived");
            await fetch('http://localhost:4000/toDo/getUncompleted', {
                method: 'GET'
            })
                // .then(data => {
                //     // resolve(data.json())
                //     data.json()
                //     console.log("============> Resolved data"+data);
                // })
                .then(res => res.json())
                .then((allUncompletedTasks) => {
                // console.log("Tasks");
                console.log(allUncompletedTasks);
                if (allUncompletedTasks.length == 0) {
                    noData = 'No pending ToDo tasks available';
                    console.log(noData);
                    this.todoMsg.innerText = noData;
                }
                else {
                    allUncompletedTasks.map((todo) => {
                        console.log(todo);
                        this.onGoingTaskContainerElement.innerHTML +=
                            `<div class="task">
                                <div class="task-info">
                                    <h4 class="todoTitle">${todo.title}</h4>
                                    <p class="todoDescription">${todo.description}</p>

                                    <div class="time-status">
                                        <p class="date">
                                            <img src="/src/images/calendar.png" alt="">
                                            ${todo.date}
                                        </p>

                                        <button id="done" onclick="markAsCompleted('${todo.id}')">Mark as Done</button>
                                    </div>

                                    <div class="actions">
                                        <img src="/src/images/quillpen.png" onClick="updateTask('${todo.id}')" id="editBtn" alt="editTask">

                                        <img src="/src/images/delete.png" onClick="deleteTask('${todo.id}')" class="deleteBtn" alt="deleteTask">
                                    </div>
                                </div>
                            </div>`;
                    });
                }
            })
                .catch(error => {
                reject(error.message);
                console.log("=====>Error rejected " + error.message);
            });
        });
    }
    async getAllCompletedTasks() {
        let completeData;
        new Promise(async (resolve, reject) => {
            console.log("New Arrivals");
            await fetch('http://localhost:4000/toDo/getCompleted', {
                method: 'GET'
            })
                .then(res => res.json())
                .then((allCompletedTasks) => {
                console.log(allCompletedTasks);
                if (allCompletedTasks.length == 0) {
                    completeData = 'No Completed Tasks at the moment.';
                    console.log(completeData);
                    this.todoCompletedMsg.innerText = completeData;
                }
                else {
                    allCompletedTasks.map((tasks) => {
                        console.log(tasks);
                        this.completedTaskContainerElement.innerHTML +=
                            `<div class="completed-task">
                            <div class="completed-task-info">
                                <h4 class="todoTitle">${tasks.title}</h4>
                                <p class="todoDescription">${tasks.description}</p>
                            
                                <div class="time-status">
                                    <p class="date">
                                        <img src="/src/images/calendar.png" alt="">
                                        ${tasks.date}
                                    </p>
                            
                                    <button id="done" onclick="markDone(this)">Completed</button>
                                </div>
                            
                            </div>
                        </div>`;
                    });
                }
            })
                .catch(error => {
                reject(error.message);
            });
        });
    }
    deleteTask(id) {
        console.log("Delete button clicked ====> " + id);
        new Promise(async (resolve, reject) => {
            let taskId = id;
            await fetch(`http://localhost:4000/toDo/${taskId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((response) => {
                console.log(response.message);
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error';
                response.message ? this.alertMsg.innerText = response.message : response.error;
                setTimeout(() => {
                    this.reset();
                    location.reload();
                }, 2500);
            })
                .catch(error => {
                reject(error.message);
            });
        });
    }
    markAsCompleted(id) {
        console.log("Completed taskID ==> " + id);
        new Promise(async (resolve, reject) => {
            let taskId = id;
            await fetch(`http://localhost:4000/toDo/isCompleted/${taskId}`, {
                method: 'PATCH'
            })
                .then(res => res.json())
                .then((response) => {
                console.log(response.message);
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error';
                response.message ? this.alertMsg.innerText = response.message : response.error;
                setTimeout(() => {
                    this.reset();
                    location.reload();
                }, 2500);
            }).catch(error => {
                reject(error.message);
            });
        });
    }
    // finish up on creating the update functionality
    // datedifference functionality
    // learn displaying the validation error msg to the UI
    updateTask(id) {
        let noTask;
        console.log("Update taskId ==>" + id);
        // check if task exists
        fetch(`http://localhost:4000/toDo/getToDo/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((toDoTask) => {
            console.log("The one to do");
            console.log(toDoTask);
            if (!toDoTask) {
                noTask = 'Task does not exist';
                console.log(noTask);
                this.todoMsg.innerHTML = noTask;
            }
            else {
                let editTask = new createTask();
                editTask.editingInputs(toDoTask.id, toDoTask.title, toDoTask.description, toDoTask.date);
                console.log("Imetumwa kwa update");
                return id;
            }
        }).catch((error) => {
            console.log(error.message);
        });
    }
    reset() {
        this.alertMsg.innerText = '';
    }
}
new createTask();
new TaskHandler().getAllTasks();
new TaskHandler().getAllCompletedTasks();
document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks();
});
let deleteTask = (id) => {
    new TaskHandler().deleteTask(id);
};
let updateTask = (id) => {
    new TaskHandler().updateTask(id);
};
let markAsCompleted = (id) => {
    new TaskHandler().markAsCompleted(id);
};
