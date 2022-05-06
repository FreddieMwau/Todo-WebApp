
class Test {
    private titleInput = <HTMLInputElement>document.getElementById('todoTitle')
    private descriptionInput = <HTMLInputElement>document.getElementById('todoDescription')
    private dateInput = <HTMLInputElement>document.getElementById('todoDate')
    private addTaskBtn = <HTMLButtonElement>document.getElementById('addBtn')
    private alert = <HTMLDivElement>document.querySelector('#alertBox')
    private form = <HTMLFormElement>document.querySelector('#newTask')
    private alertMsg = <HTMLParagraphElement>document.getElementById('message')
    constructor() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.submitData()
        })
    }




    private submitData() {
        console.log(this.titleInput.value);
        const promise = new Promise<{ message: string, error: string }>((resolve, reject) => {
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
                resolve(data.json())


            }).catch(error => {
                reject(error)
            })

        })

        promise.then(data => {
            console.log(data.message);
            this.alertMsg.className = data.message ? 'msg-success' : 'msg-error'
            data.message ? this.alertMsg.innerText = data.message : data.error
            setTimeout(() => {
                this.reset()
                location.reload()
            }, 1000)

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
    private todoMsg = <HTMLParagraphElement>document.getElementById('noData')
    private alertMsg = <HTMLParagraphElement>document.getElementById('message')
    constructor() {}

    async getAllTasks() {
        let noData:string
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
                    noData = 'No ToDo tasks available'
                    console.log(noData);                    
                    this.todoMsg.innerText = noData
                } else {
                    allTasks.map((todo: any) => {
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
                console.log("=====Error rejected " + error.message);

            })
        })

        allData.then(data => {
            console.log("====> The json " + data);
            
        })
    }

    deleteTask(id: string){
        console.log("Delete button clicked ====> " + id);
        const deleteTask = new Promise<{message: string, error:string}>(async (resolve , reject) => {
            let taskId = id
            await fetch(`http://localhost:4000/toDo/${taskId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((response) => {
                    console.log(response.message);
                    this.alertMsg.className = response.message ? 'msg-success' : 'msg-error'
                    response.message ? this.alertMsg.innerText = response.message : response.error
                    setTimeout(() => {
                        this.reset()
                        location.reload()
                    }, 3500)
                })
        })
    }

    updateTask(id: string){
        console.log("Update taskId ==>" + id);
    }
    reset() {
        this.alertMsg.innerText = ''
    }
}


new Test()

new TaskHandler().getAllTasks()

document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks()
})

// document.getElementById('deleteBtn')?.addEventListener('click', (e) => {
//     e.preventDefault()
//     new TaskHandler().deleteTask()
// })

let deleteTask = (id:string) => {
    new TaskHandler().deleteTask(id)
}

let updateTask = (id:string) => {
    new TaskHandler().updateTask(id)
}