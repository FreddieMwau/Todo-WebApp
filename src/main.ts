
class createTask {
    private titleInput = <HTMLInputElement>document.getElementById('todoTitle')
    private descriptionInput = <HTMLInputElement>document.getElementById('todoDescription')
    private assignEmailInput = <HTMLInputElement>document.getElementById('assignedEmail')
    private dateInput = <HTMLInputElement>document.getElementById('todoDate')
    private form = <HTMLFormElement>document.querySelector('#newTask')
    private addBtn = <HTMLButtonElement>document.getElementById('addBtn')
    private updateBtn = <HTMLButtonElement>document.getElementById('updateBtn')
    private deleteBtn = <HTMLButtonElement>document.getElementById('deleteBtn')
    private alertMsg = <HTMLParagraphElement>document.getElementById('message')
    private toDoId:string = ""
    constructor() {
        this.form.addEventListener('click', (e) => {
            e.preventDefault()
        })

        this.addBtn.addEventListener('click', () => {
            this.submitData()
        })

        this.updateBtn.addEventListener('click', ()=> {
            this.updateToDo()
        })

        this.deleteBtn.addEventListener('click', () => {
            this.deleteAllTasks()
        })
    }

    private submitData() {
        console.log(this.titleInput.value);
        const promise = new Promise<{ message: string, error: string }>((resolve, reject) => {
            fetch('http://localhost:4000/toDo/newToDo', {
                method: 'POST',

                body: JSON.stringify({
                    title: this.titleInput.value,
                    description: this.descriptionInput.value,
                    date: this.dateInput.value,
                    assignEmail: this.assignEmailInput.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(data => {
                resolve(data.json())
            }).catch(error => {
                reject(error)
            })

        })

        promise.then(data => {
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error'
            data.message ? this.alertMsg.innerText = data.message : data.error
            setTimeout(() => {
                this.reset()
                location.reload()
            }, 2500)

        })
        .catch(error => {
            this.alertMsg.className = error.message ?'msg-success' : 'msg-error'
            error.message ? this.alertMsg.innerText = error.message :error.error
        })

    }

    editingInputs(id: string, title: string, description: string, date: string){
        this.toDoId = id
        this.titleInput.value = title
        this.descriptionInput.value = description
        this.dateInput.value = date
    }

    private updateToDo(){
        const update = new Promise<{message: string, error:string}> (async (resolve, reject) => {
            fetch(`http://localhost:4000/toDo/${this.toDoId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: this.titleInput.value,
                    description: this.descriptionInput.value,
                    date: this.dateInput.value
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                resolve(res.json())
            })
            .catch(error => {
                error.message
            })
        })

        update.then(data => {
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error'
            data.message ? this.alertMsg.innerText = data.message : data.error
            setTimeout(() => {
                this.reset()
                location.reload()
            }, 2500)
        })
    }

    private deleteAllTasks(){
        new Promise<{message:string, error:string}> (async (resolve, reject) => {
            await fetch('http://localhost:4000/toDo/deleteTasks/', {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then((response) => {
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error'
                response.message ? this.alertMsg.innerText = response.message : response.error
                setTimeout(() => {
                    location.reload()
                }, 2500)
            })
            .catch(error => {
                reject(error.message)
            })
        }) 
    }
    reset() {
        this.titleInput.value = ''
        this.descriptionInput.value = ''
        this.dateInput.value = ''
        this.alertMsg.innerText = ''
    }

}

class TaskHandler {
    private onGoingTaskContainerElement = <HTMLDivElement>document.getElementById('tasksContainer')
    private completedTaskContainerElement = <HTMLDivElement>document.getElementById('completed-tasks')
    private todoMsg = <HTMLParagraphElement>document.getElementById('noData')
    private todoCompletedMsg = <HTMLParagraphElement>document.getElementById('completedData')
    private alertMsg = <HTMLParagraphElement>document.getElementById('message')
    constructor() {}

    async getAllTasks() {
        let noData:string
        new Promise(async (resolve, reject) => {
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
                console.log(allUncompletedTasks);
                if (allUncompletedTasks.length == 0) {
                    noData = 'No pending ToDo tasks available'
                    this.todoMsg.innerText = noData
                } else {
                    allUncompletedTasks.map((todo: any) => {
                        this.onGoingTaskContainerElement.innerHTML +=
                            `<div class="task">
                                <div class="task-info">
                                    <h4 class="todoTitle">${todo.title}</h4>
                                    <p class="todoDescription">${todo.description}</p>

                                    <div class="time-status">
                                        <p class="date">
                                            <img src="/src/images/calendar.png" alt="">
                                            ${new Date(todo.date).toLocaleDateString()}
                                        </p>

                                        <button id="done" onclick="markAsCompleted('${todo.id}')">Mark as Done</button>
                                    </div>

                                    <div class="assigned">
                                        <img src="/src/images/mail.png" alt="mail" class="email">
                                        <p class="assigned-person">${todo.assignEmail}</p>
                                    </div>

                                    <div class="actions">
                                        <img src="/src/images/quillpen.png" onClick="updateTask('${todo.id}')" id="editBtn" alt="editTask">

                                        <img src="/src/images/delete.png" onClick="deleteTask('${todo.id}')" class="deleteBtn" alt="deleteTask">
                                    </div>
                                </div>
                            </div>`
                    })
                }
            })
            .catch(error => {
                reject(error.message)
            })
        })
    }

    async getAllCompletedTasks() {
        let completeData:string
        new Promise(async (resolve,reject) => {
            await fetch('http://localhost:4000/toDo/getCompleted',{
                method: 'GET'
            })
            .then(res => res.json())
            .then((allCompletedTasks) => {
                if(allCompletedTasks.length == 0){
                    completeData = 'No Completed Tasks at the moment.'
                    this.todoCompletedMsg.innerText = completeData
                } else {
                    allCompletedTasks.map((tasks:any) => {
                        let timeCompleted : string
                        console.log(tasks);
                        
                        let difference: number = tasks.hourDifference / 24

                        if(difference > 0){
                            timeCompleted = `<p id="completed-early">Task completed early by ${difference} day's</p>`
                        } else if(difference == 0){
                            timeCompleted = '<p id="completed-onTime">Task completed on time</p>'
                        } else {
                            timeCompleted = `<p id="completed-late">Task completed late by ${Math.abs(difference)} day's`
                        }
                        this.completedTaskContainerElement.innerHTML += 
                        `<div class="completed-task">
                            <div class="completed-task-info">
                                <h4 class="todoTitle">${tasks.title}</h4>
                                <p class="todoDescription">${tasks.description}</p>
                            
                                <div class="time-status">
                                    <p class="date">
                                        <img src="/src/images/calendar.png" alt="">
                                        ${tasks.completedDate}
                                    </p>
                                    <button id="done" onclick="markDone(this)">Completed</button>
                                </div>
                                ${timeCompleted}
                            
                                <div class="assigned">
                                        <img src="/src/images/mail.png" alt="mail" class="email">
                                        <p class="assigned-person">${tasks.assignEmail}</p>
                                </div>
                            </div>
                        </div>`
                    })
                }
            })
            .catch(error => {
                reject(error.message)
            })
        })
    }

    deleteTask(id: string){
        new Promise<{message: string, error:string}>(async (resolve , reject) => {
            let taskId = id
            await fetch(`http://localhost:4000/toDo/${taskId}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then((response) => {
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error'
                response.message ? this.alertMsg.innerText = response.message : response.error
                setTimeout(() => {
                    this.reset()
                    location.reload()
                }, 2500)
            })
            .catch(error => {
                reject(error.message)
            })
        })
    }

    markAsCompleted(id:string){
        new Promise<{message:string, error:string}> (async (resolve,reject) => {
            let taskId = id
            await fetch(`http://localhost:4000/toDo/isCompleted/${taskId}`, {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then((response) => {
                this.alertMsg.className = response.message ? 'msg-success' : 'msg-error'
                response.message ? this.alertMsg.innerText = response.message : response.error
                setTimeout(() => {
                    this.reset()
                    location.reload()
                }, 2500)
            }).catch(error => {
                reject(error.message)
            })
        })
    }
    // learn displaying the validation error msg to the UI

    updateTask(id: string){
        let noTask:string
        // check if task exists
        fetch(`http://localhost:4000/toDo/getToDo/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((toDoTask) =>{
            if(!toDoTask){
                noTask = 'Task does not exist'
                this.todoMsg.innerHTML = noTask
            } else {
                let editTask = new createTask()
                editTask.editingInputs(toDoTask.id, toDoTask.title, toDoTask.description, toDoTask.date)
                return id
            }            
        }).catch((error) => {
            console.log(error.message);
        })
    }
    reset() {
        this.alertMsg.innerText = ''
    }
}


new createTask()

new TaskHandler().getAllTasks()
new TaskHandler().getAllCompletedTasks()

document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks()   
})


let deleteTask = (id:string) => {
    new TaskHandler().deleteTask(id)
}

let updateTask = (id:string) => {
    new TaskHandler().updateTask(id)
}

let markAsCompleted = (id:string) => {
    new TaskHandler().markAsCompleted(id)
}