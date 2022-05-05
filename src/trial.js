document.querySelector('#push').onclick = function(){
    if(document.querySelector('#new-task input').ariaValueMax.length == 0){
        alert("Please enter a task")
    } else {
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#new-task input').value}
                </span>
            </div>
        `;
    }
}