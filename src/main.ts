
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
    private onGoingTaskDivElement = <HTMLDivElement>document.getElementById('tasks')
    private onGoingTaskContainerElement = <HTMLDivElement>document.getElementById('tasksContainer')
    private completedTaskContainer = <HTMLDivElement>document.getElementById('completed-container')
    private completedTaskDivElement = <HTMLDivElement>document.getElementById('completed-tasks')
    private todoAlertDiv = <HTMLDivElement>document.getElementById('alertBox')
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
                                        <img src="/src/images/quillpen.png" class="editBtn" alt="editTask">

                                        <img src="/src/images/delete.png" class="deleteBtn" alt="deleteTask">
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
}


new Test()

new TaskHandler().getAllTasks()

document.addEventListener('DOMContent', () => {
    new TaskHandler().getAllTasks()
})