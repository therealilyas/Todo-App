let addInput = document.querySelector('.todo-input');
let addBtn = document.querySelector('.add-todo-btn');
let todoList = document.querySelector('.todoList');
let countTodo = document.querySelector('.count-todo');
let deleteAllBtn = document.querySelector('.clear-todo-btn');

addInput.addEventListener('keyup', () => {
    if (addInput.value == '') {
        addBtn.classList.remove('active');
        return;
    }
    if (addInput.value.trim() != 0) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }

});

showToDo();
addBtn.addEventListener('click', () => {
    let userData = addInput.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listTodo = [];
    } else {
        listTodo = JSON.parse(getLocalStorage);
    }
    listTodo.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listTodo));
    showToDo();
    addInput.value = '';
    addBtn.classList.remove('active');
});

function showToDo() {
    let getLocalStorage = localStorage.getItem('New Todo');
    if (getLocalStorage == null) {
        listTodo = [];
    } else {
        listTodo = JSON.parse(getLocalStorage);
    }
    if (listTodo.length > 0) {
        deleteAllBtn.classList.add('active');
    } else {
        deleteAllBtn.classList.remove('active');
    }

    let todoLI = '';

    listTodo.forEach((element, index) => {
        todoLI += `
        <li>
        <span>${element}</span><button class='remove-todo-btn' onclick='deleteTodo(${index})'>-</button>
        </li>
        `;

    });
    todoList.innerHTML = todoLI;
    localStorage.setItem("New Todo", JSON.stringify(listTodo))
    countTodo.innerText = listTodo.length;

}

function deleteTodo(i) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listTodo = JSON.parse(getLocalStorage);
    listTodo.splice(i, 1);
    localStorage.setItem("New Todo", JSON.stringify(listTodo));
    showToDo();
}

deleteAllBtn.addEventListener('click', () => {
    listTodo = [];
    localStorage.setItem('New Todo', JSON.stringify(listTodo));
    showToDo();
});