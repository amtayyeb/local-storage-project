// 1. HTML elements ko pakadna
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

// 2. Tasks ka array (yahan data memory me rehta hai)
let tasks = [];

// 3. localStorage se tasks wapas lana (page khulte hi)
function loadTasks() {
    try {
        const saved = localStorage.getItem("tasks");   // text milta hai ya null
        tasks = saved ? JSON.parse(saved) : [];        // text -> array
    } catch (e) {
        tasks = [];
    }
}

// 4. Tasks ko localStorage me save karna
function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks)); // array -> text
    } catch (e) {
        console.log("Save nahi hua:", e);
    }
}

// 5. Screen par list dikhana
function render() {
    list.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        if (task.done) li.className = "done";

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = function () {          // click par done / not done
            tasks[index].done = !tasks[index].done;
            saveTasks();
            render();
        };

        const del = document.createElement("button");
        del.textContent = "✕";
        del.onclick = function () {           // ek task delete
            tasks.splice(index, 1);
            saveTasks();
            render();
        };

        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
    });
    const left = tasks.filter(function (t) { return !t.done; }).length;
    count.textContent = left + " task(s) left";
}

// 6. Naya task add karna
function addTask() {
    const text = input.value.trim();
    if (text === "") return;                // khali task nahi
    tasks.push({ text: text, done: false });
    input.value = "";
    saveTasks();
    render();
}

addBtn.onclick = addTask;
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addTask();
});
clearBtn.onclick = function () {          // sab kuch delete
    tasks = [];
    saveTasks();
    render();
};

// 7. Start
loadTasks();
render();