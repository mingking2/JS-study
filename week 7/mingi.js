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

let indexNum = 0;
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

        const todoItem = {
            index: ++indexNum,
            content: todoInput.value,
            checked: 'active' // 체크박스 유무 초기화
        }

        todoData.set(indexNum, todoItem);

        const todoList = document.querySelector('.todo-list');

        const div = document.createElement('div');
        div.setAttribute("class", "todo-item");
        div.setAttribute("id", indexNum);
        //div.setAttribute("checked", 'active');

        const input = document.createElement('input');
        input.setAttribute("class", "content");
        input.value = todoItem.content;

        const checkbox = document.createElement('input');
        checkbox.setAttribute("class", "checkbox");
        checkbox.setAttribute("data-checked", todoItem.checked)
        checkbox.type = "checkbox";


        const delBtn = document.createElement('button');
        delBtn.setAttribute("class", 'delBtn');
        delBtn.innerHTML = 'X';

        div.appendChild(checkbox);
        div.appendChild(input);
        div.appendChild(delBtn);
        todoList.appendChild(div);


        checkItems();
        console.log(todoData);
        todoInput.value = "";
    }
}

const checkItems = () => {
    const leftItems = document.querySelector('.left-items');
    // 체크된 항목 개수 구하기
    let checkedCount = 0;
    for (const item of todoData.values()) {
        if (item.checked === 'completed') {
            checkedCount++;
        }
    }
    const restItems = todoData.size - checkedCount;
    leftItems.innerHTML = `🥕 오늘 할 일이 ${restItems}개 남았습니다 🥕`;
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
        const delItem = event.target.parentNode;
        todoData.delete(Number(delItem.id));
        console.log(todoData);
        delItem.remove();
    }

    if (event.target.classList.contains('checkbox')) {
        const checkbox = event.target;
        const todoItem = checkbox.parentNode;
        const itemId = Number(todoItem.id);
        const item = todoData.get(itemId);
        item.checked = checkbox.checked ? 'completed' : 'active';
        const contentElement = todoItem.querySelector('.content');
        if (item.checked === 'completed') {
            contentElement.style.textDecoration = 'line-through';
        } else {
            contentElement.style.textDecoration = 'none';
        }
        console.log(todoData);
    }

    if (event.target.classList.contains('show-all-btn') && event.target.classList.contains('selected')) {
        console.log("모두 보여줘");
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            todoItem.style.display = 'flex';
        });
    }

    if (event.target.classList.contains('show-active-btn')) {
        console.log("남은일 보여줘");
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            const todoCheck = todoItem.checkbox;
            console.log(todoCheck);
            if(todoItem && todoItem.checkbox.dataset.checked === 'active') {
                todoItem.style.display = 'flex';
            } else {
                todoItem.style.display = 'none';
            }
        });
    }

    if (event.target.classList.contains('show-completed-btn')) {
        console.log('다한거 보여줘');
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            if(todoItem && todoItem.checked === 'completed') {
                todoItem.style.display = 'flex';
            } else {
                todoItem.style.display = 'none';
            }
        });
    }

    if (event.target.classList.contains('clear-all-btn')) {
        console.log("초기화해줘");
    }

    checkItems();
});


enterBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', addTodo);