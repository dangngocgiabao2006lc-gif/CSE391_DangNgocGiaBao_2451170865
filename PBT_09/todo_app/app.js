const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const count = document.querySelector("#count");
const clearCompletedBtn =
    document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

renderTodos();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    input.value = "";

    saveTodos();
    renderTodos();
});

todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete")) {
        todos = todos.filter(todo => todo.id !== id);
    } else {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
    }

    saveTodos();
    renderTodos();
});

todoList.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("text")) return;

    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    const newText = prompt("Edit todo:", e.target.textContent);

    if (!newText) return;

    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.text = newText;
        }
        return todo;
    });

    saveTodos();
    renderTodos();
});

document.querySelectorAll(".filters button")
.forEach(btn => {
    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);

    saveTodos();
    renderTodos();
});

function renderTodos() {

    todoList.innerHTML = "";

    let filtered = todos;

    if (filter === "active") {
        filtered = todos.filter(todo => !todo.completed);
    }

    if (filter === "completed") {
        filtered = todos.filter(todo => todo.completed);
    }

    filtered.forEach(todo => {

        const li = document.createElement("li");

        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = todo.text;
        span.classList.add("text");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete");

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();
}

function updateCount() {
    const activeCount =
        todos.filter(todo => !todo.completed).length;

    count.textContent =
        `${activeCount} items left`;
}

function saveTodos() {
    localStorage.setItem("todos",
        JSON.stringify(todos));
}