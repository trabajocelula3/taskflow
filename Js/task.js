
const btn = document.getElementById("add")
const formContainer = document.getElementById("register")
const pendiente = document.getElementById("pendiente");
let listTask = []

let currentFilter = "all";

document.getElementById("filterBar").addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        currentFilter = e.target.dataset.status;
        showCards();
    }
});

btn.addEventListener('click', createForm)

if (localStorage.getItem("isLogged") !== "true") {
    window.location.href = "login.html";
}

function createForm(e) {
    e.preventDefault()
    const existingForm = formContainer.querySelector("form");

    if (existingForm) {
        existingForm.remove();
        return;
    }


    const fragment = document.createDocumentFragment();
    
    const form = document.createElement("form");
    form.className = "card p-3 mt-3 d-flex flex-column gap-3 border p-3 rounded justify-content-center";

    form.innerHTML =
        `
    <h5 class="d-flex justify-content-center text-uppercase">Create a new task</h5>

    <label for="taskName">Enter a task name:</label>
    <input
        type="text"
        id="taskName"
        name="taskName"
        class="form-control"
        placeholder="Task name"
    >

    <label for="description">Enter a description:</label>
    <input
        type="text"
        id="description"
        name="description"
        class="form-control"
        placeholder="Task description"
    >

    <label for="priority">Choose priority:</label>
    <select name="priority" class="form-select" id="priority">
        <option value="select">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    </select>

    <button type="submit" class="btn bg-success-subtle mt-2">
    Send
    </button>
    `

    form.addEventListener("submit", card);
    form.addEventListener("submit", showCards);
    fragment.appendChild(form);
    formContainer.appendChild(fragment);
}

function createId() {
    let numberId = 1;
    for (let i = 0; i < listTask.length; i++) {
        numberId += 1;
    }
    return numberId
}

function card(e) {
    e.preventDefault();
    const taskName = e.target.taskName.value.trim();
    const description = e.target.description.value.trim();
    const priority = e.target.priority.value;

    if (taskName === "" || description === "" || priority === "select") {
        alert("Ingresa el valor");
        return;
    }

    const task = {
        id: createId(),
        nombre: taskName,
        description: description,
        priority: priority,
        status: "pending"
    }
    listTask.push(task);
    e.target.remove();
}

const containerLisTask = document.getElementById("containerTask");
const view = document.getElementById("viewCards");
// view.addEventListener("click", showCards);
function showCards() {
    if (listTask.length === 0) {
        return containerLisTask.innerHTML = "";

    } else {

        containerLisTask.innerHTML = "";
        const formateTask = document.createElement("div");
        formateTask.className = "d-flex flex-row flex-grap gap-5 justify-content-center m-5"
        for (let i = 0; i < listTask.length; i++) {
            const task = listTask[i];
            formateTask.innerHTML += `
            <div class="card p-2 mb-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded w-25 ${task.priority} ${task.status}">
                <h5 class="text-center">${task.nombre}</h5>
                <p class="text-center">${task.description}</p>
                <p class="text-center">Priority: ${task.priority}</p>
                <p class="text-center"><span class="${task.status === 'process'
                    ? 'text-warning fw-bold'
                    : task.status === 'finish'
                        ? 'text-info-emphasis fw-bold'
                        : 'text-secondary'
                }">
                ${task.status}
                </span></p>
                <button class="btn btn-outline-warning btn-sm  update-btn m-2" data-id="${task.id}">
                Up-date
                </button>
                <button class="btn btn-outline-danger btn-sm delete-btn up-date m-2" data-id="${task.id}">
                Delete
                </button>

            </div>
        `;
        }

        containerLisTask.appendChild(formateTask)
    }
}

containerLisTask.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        deleteTask(id);
        showCards();
    }
})
function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want delete task?")
    if (!confirmDelete) return;

    listTask = listTask.filter(task => task.id !== id);
    showCards(); // volver a renderizar

}

containerLisTask.addEventListener("click", (i) => {
    if (i.target.classList.contains("update-btn")) {
        const id = Number(i.target.dataset.id);
        updateStatus(id);
    }
}
)
function updateStatus(id) {
    const confirmUpdate = confirm("Are you sure you want to change the status?")

    if (!confirmUpdate) return;

    const task = listTask.find(task => task.id === id)

    if (task.status === "pending") {
        task.status = "process"
    } else if (task.status === "process") {
        task.status = "finish"
    }


    showCards();
}

pendiente.addEventListener("click", pendingTask)

// function pendingTask(e) {
//     const finish = document.querySelectorAll(".finish");
//     const process = document.querySelectorAll(".process");
//     finish.forEach(card => {
//         card.style.display = "none";
//     });
//     process.forEach(card => {
//         card.style.display = "none";
//     });
// } 
function pendingTask() {
    document.querySelectorAll(".finish, .process")
        .forEach(card => card.classList.add("d-none"));
        console.log("hola");
}