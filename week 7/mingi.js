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

        if (todoInput.value.trim() === "") {
            alert("내용이 비엇다");
            return;
        }

        for (let value of todoData.values()) {
            if (value === todoInput.value) {
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

        const input = document.createElement('input');
        input.setAttribute("class", "content");
        input.value = todoInput.value;

        const checkbox = document.createElement('input');
        checkbox.setAttribute("class", "checkbox");
        checkbox.type = "checkbox";

        const delBtn = document.createElement('button');
        delBtn.setAttribute("class", 'delBtn');
        delBtn.innerHTML = 'X';

        div.appendChild(checkbox);
        div.appendChild(input);
        div.appendChild(delBtn);
        todoList.appendChild(div);
        number++;

        console.log(todoData);
        todoInput.value = "";
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('content')) {
        const contentInput = event.target;
        const todoItem = contentInput.parentNode;
        const itemId = todoItem.getAttribute('id');
        const savedValue = todoData.get(itemId);

        if (contentInput.value.trim() !== '') {
            if (contentInput.value !== savedValue) {
                todoData.set(Number(itemId), contentInput.value);
                console.log(todoData);
            } 
        } else {
            const originalValue = todoData.get(Number(itemId));
            contentInput.value = originalValue;
            alert('내용이 비었습니다. 원래 데이터로 되돌립니다.');
        }
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBtn')) {
        console.log('삭제버튼이다.');
    }

    if (event.target.classList.contains('checkbox')) {
        console.log('체크밗흐이다.');
    }
});


enterBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', addTodo);