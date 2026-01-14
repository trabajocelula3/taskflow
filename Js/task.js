const btn = document.getElementById("add");
const formContainer = document.getElementById("register");
const containerLisTask = document.getElementById("containerTask");
let listTask = []; 
let currentFilter = "all";


const filterBar = document.getElementById("filterBar"); 
const isLogged = localStorage.getItem("isLogged") ; 

if (isLogged !== true) {
    window.location.href = "../../index.html"
}
filterBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        currentFilter = e.target.dataset.status;
        showCards();
    }
});



btn.addEventListener("click", createForm);

function createForm(e) {
    e.preventDefault();

    const existingForm = formContainer.querySelector("form");
    if (existingForm) {
        existingForm.remove();
        return;
    }

    const form = document.createElement("form");
    form.className = "card p-3 mt-3 d-flex flex-column gap-3";

    form.innerHTML = `
        <h5 class="text-center">Create a new task</h5>

        <input type="text" name="taskName" class="form-control" placeholder="Task name">
        <input type="text" name="description" class="form-control" placeholder="Description">

        <select name="priority" class="form-select">
            <option value="select">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <button type="submit" class="btn bg-success-subtle  fw-semibold  px-4 shadow-sm hover-shadow">Send</button>
    `;

    form.addEventListener("submit", createTask);
    formContainer.appendChild(form);
}



function createId() {
    return Date.now()
}

function createTask(e) {
    e.preventDefault();

    const taskName = e.target.taskName.value.trim();
    const description = e.target.description.value.trim();
    const priority = e.target.priority.value;

    if (!taskName || !description || priority === "select") {
        alert("Complete all fields");
        return;
    }

    const task = {
        id: createId(),
        nombre: taskName,
        description,
        priority,
        status: "pending"
    };

    listTask.push(task);
    e.target.remove();
    showCards();
}



function showCards() {
    containerLisTask.innerHTML = "";

    const filteredTasks = listTask.filter(task => {
        if (currentFilter === "all") return true;
        return task.status === currentFilter;
    });

    if (filteredTasks.length === 0) return;

    const wrapper = document.createElement("div");
    wrapper.className = "d-flex gap-4 flex-wrap justify-content-center mt-4";

    filteredTasks.forEach(task => {
        wrapper.innerHTML += `
            <div class="card p-3 w-25 shadow ${task.priority} ${task.status}">

                <h5 class="text-center">${task.nombre}</h5>
                <p class="text-center">ID: ${task.id}</p>
                <p class="text-center">${task.description}</p>
                <p class="text-center">Priority: ${task.priority}</p>
                <p class="text-center fw-bold">${task.status}</p>

                <div class="text-center">
                    <button class="btn btn-outline-warning btn-sm update-btn" data-id="${task.id}">
                        Update
                    </button>
                    <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${task.id}">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });

    containerLisTask.appendChild(wrapper);
}



containerLisTask.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(id);
    }

    if (e.target.classList.contains("update-btn")) {
        updateStatus(id);
    }
});

function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    listTask = listTask.filter(task => task.id !== id);
    showCards();
}

function updateStatus(id) {
    const confirmUpdate = confirm("Are you sure you want to change the status?") 
    if (!confirmUpdate) return; 
    const task = listTask.find(task => task.id === id) 
    if (task.status === "pending") {
        task.status = "process" 
    } else if (task.status === "process") {
         task.status = "finish" 
        } showCards(); 
    }
