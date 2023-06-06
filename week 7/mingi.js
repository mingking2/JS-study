const clock = document.querySelector('.todo-title');
const enterBtn = document.querySelector('.enter');
const todoInput = document.querySelector('.todo-input');

const getTime = () => {
    const chtime = new Date();
    const hours = chtime.getHours();
    const minutes = chtime.getMinutes();
    const seconds = chtime.getSeconds();
    clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}


setInterval(getTime, 1000);

let number = 0;
const todoData = new Map();

const addTodo = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === 13)) {
        event.preventDefault(); // 기본 동작 방지

        const todoInput = document.querySelector('.todo-input');

      
        if(todoInput.value.trim() === "") {
            alert("내용이 비엇다");
            return;
        }

        console.log(todoInput.value);

        for(let value of todoData.values()) {
            console.log(value);
            if(value === todoInput.value) {
                alert("중복이 있다");
                todoInput.value = "";
                return;
            }
        }


        todoData.set(number, todoInput.value);

        const todoList = document.querySelector('.todo-list');

        const div = document.createElement('div');
        div.setAttribute("class", "todo-item");
        div.setAttribute("id", number);

        const li = document.createElement('li');
        li.innerHTML = todoInput.value;

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        const delBtn = document.createElement('button');
        delBtn.innerHTML = 'X';

        div.appendChild(checkbox);
        div.appendChild(li);
        div.appendChild(delBtn);
        todoList.appendChild(div);
        number++;

        console.log(todoData);
        todoInput.value = "";
    }
}

enterBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', addTodo);