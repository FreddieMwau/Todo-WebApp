"use strict";
class Test {
    titleInput = document.getElementById('todoTitle');
    descriptionInput = document.getElementById('todoDescription');
    dateInput = document.getElementById('todoDate');
    addTaskBtn = document.getElementById('addBtn');
    alert = document.querySelector('#alertBox');
    form = document.querySelector('#newTask');
    alertMsg = document.getElementById('message');
    constructor() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitData();
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
            }, 1000);
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
    onGoingTaskDivElement = document.getElementById('tasks');
    onGoingTaskContainerElement = document.getElementById('tasksContainer');
    completedTaskContainer = document.getElementById('completed-container');
    completedTaskDivElement = document.getElementById('completed-tasks');
    todoAlertDiv = document.getElementById('alertBox');
    constructor() {
        // this.onGoingTaskDivElement.addEventListener('loadeddata', ()=> {
        // })
    }
    async getAllTasks() {
        const allData = new Promise(async (resolve, reject) => {
            console.log("Arrived");
            await fetch('http://localhost:4000/toDo/', {
                method: 'GET'
            })
                // .then(data => {
                //     // resolve(data.json())
                //     data.json()
                //     console.log("============> Resolved data"+data);
                // })
                .then(res => res.json())
                .then((allTasks) => {
                console.log("Taasks");
                console.log(allTasks);
                if (allTasks.length == 0) {
                    console.log("No data");
                }
                else {
                    allTasks.map((todo) => {
                        console.log(todo);
                        this.onGoingTaskContainerElement.innerHTML +=
                            `<div class="task">
                                <div class="color"></div>
                                <div class="task-info">
                                    <h4 class="todoTitle">${todo.title}</h4>
                                    <p class="todoDescription">${todo.description}</p>

                                    <div class="time-status">
                                        <p class="date">
                                            <img src="/src/images/calendar.png" alt="">
                                            ${todo.date}
                                        </p>

                                        <button id="done" onclick="markDone(this)">Mark as Done</button>
                                    </div>

                                    <div class="actions">
                                        <img src="/src/images/quillpen.png" class="editBtn" alt="editTask">

                                        <img src="/src/images/delete.png" class="deleteBtn" alt="deleteTask">
                                    </div>
                                </div>
                            </div>`;
                    });
                }
            })
                .catch(error => {
                reject(error.message);
                console.log("=====Error rejected " + error.message);
            });
        });
        allData.then(data => {
            console.log("====> The json " + data);
        });
    }
}
new Test();
new TaskHandler().getAllTasks();
document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks();
});
