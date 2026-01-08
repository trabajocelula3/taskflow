
const btn = document.getElementById("add")
const formContainer = document.getElementById("register")
let listTask = []

btn.addEventListener('click', createForm)

if (localStorage.getItem("isLogged") !== "true") {
  window.location.href = "login.html";
}

function createForm(e){
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
    fragment.appendChild(form);
    formContainer.appendChild(fragment);
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
        nombre: taskName,
        description: description,
        priority: priority,
        status: "pending"
    }
    listTask.push(task); 
    e.target.remove();
}

