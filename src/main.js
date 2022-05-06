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
    todoMsg = document.getElementById('noData');
    completeBtn = document.getElementById('done');
    deleteBtn = document.getElementById('deleteBtn');
    editBtn = document.getElementById('editBtn');
    alertMsg = document.getElementById('message');
    constructor() {
        // this.deleteBtn.addEventListener('click', (e) => {
        //     e.preventDefault()
        //     this.deleteTask()
        // })
    }
    async getAllTasks() {
        let noData;
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
                // console.log("Tasks");
                console.log(allTasks);
                if (allTasks.length == 0) {
                    console.log("No data");
                    noData = 'No ToDo tasks available';
                }
                else {
                    allTasks.map((todo) => {
                        console.log(todo);
                        this.onGoingTaskContainerElement.innerHTML +=
                            `<div class="task">
                                <div class="color"></div>
                                <div class="task-info">
                                    <p class="noData"></p>
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
                                        <img src="/src/images/quillpen.png" class="editBtn"  id="editBtn" alt="editTask">

                                        <img src="/src/images/delete.png" class="deleteBtn" onClick="deleteTask('${todo.id}')" class="deleteBtn" alt="deleteTask">
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
            this.todoMsg.innerText = noData;
        });
    }
    deleteTask(id) {
        console.log("Delete button clicked ====> " + id);
        const deleteTask = new Promise(async (resolve, reject) => {
            let taskId = id;
            await fetch(`http://localhost:4000/toDo/${taskId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((response) => {
                console.log(response.message);
            });
        });
        deleteTask.then(data => {
            console.log("Delete response ===> " + data);
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error';
            data.message ? this.alertMsg.innerText = data.message : data.error;
            setTimeout(() => {
                this.reset();
                location.reload();
            }, 1000);
        });
    }
    reset() {
        this.alertMsg.innerText = '';
    }
}
new Test();
new TaskHandler().getAllTasks();
document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks();
});
// document.getElementById('deleteBtn')?.addEventListener('click', (e) => {
//     e.preventDefault()
//     new TaskHandler().deleteTask()
// })
let deleteTask = (id) => {
    new TaskHandler().deleteTask(id);
};
