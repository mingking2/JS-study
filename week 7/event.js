import {
    addTodo,
    updateTodo,
    toggleTodo,
    delTodo,
    todoData,
} from "./todo.js";

const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const enter = document.querySelector(".enter");
const leftItems = document.querySelector(".left-items");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clear = document.getElementById("clear");

const ALL = "all";
const ACTIVE = "acitve";
const COMPLETED = "completed";

let status = ALL;

const filterTodo = (todoData, checked) => {
    const filterMap = new Map();

    todoData.forEach((_, itemId) => {
        const todoItem = todoData.get(itemId);
        if (todoItem.checked === checked) {
            filterMap.set(itemId, todoItem);
        }
    });

    return filterMap;
}

const changeStatus = () => {
    if (status === ACTIVE) return filterTodo(todoData, ACTIVE);
    else if (status === COMPLETED) return filterTodo(todoData, COMPLETED);

    return todoData;
}


const renderTodo = () => {
    const renderTodos = changeStatus();
    console.log(renderTodos);
    renderTodos.forEach((todo) => {
        if (!todo) return;
    
        const div = document.createElement('div');
        div.setAttribute("class", "todo-item");
        div.setAttribute("id", todo.index);

        const input = document.createElement('input');
        input.setAttribute("class", "content");
        input.value = todo.content;

        const checkbox = document.createElement('input');
        checkbox.setAttribute("class", "checkbox");
        checkbox.setAttribute("data-checked", todo.checked)
        checkbox.type = "checkbox";

        const delBtn = document.createElement('button');
        delBtn.setAttribute("class", 'delBtn');
        delBtn.innerHTML = 'X';

        div.appendChild(checkbox);
        div.appendChild(input);
        div.appendChild(delBtn);

        const todoList = document.querySelector('.todo-list');
        todoList.appendChild(div);
    });


}


export const activeEventListner = () => {
    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTodo(todoInput.value);
            todoInput.value = "";
            todoList.innerHTML = "";
            renderTodo();
        }
    });

    enter.addEventListener('click', () => {
        addTodo(todoInput.value);
        todoInput.value = "";
        todoList.innerHTML = "";
        renderTodo();
    });

}