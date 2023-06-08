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
            if (value.content === todoInput.value) {
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

enterBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', addTodo);

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

const updateTodoItem  = (contentInput) => {
    const todoItem = contentInput.parentNode;
    const itemId = todoItem.getAttribute('id');
    const savedValue = todoData.get(Number(itemId));

    if (contentInput.value.trim() !== '') {
        if (contentInput.value !== savedValue.content) {
            savedValue.content = contentInput.value; // content 속성만 업데이트
            todoData.set(Number(itemId), savedValue);
            console.log('업데이트!');
            console.log(todoData);
        }
    } else {
        const originalValue = todoData.get(Number(itemId));
        contentInput.value = originalValue.content;
        alert('내용이 비었습니다. 원래 데이터로 되돌립니다.');
    }
}

// 엔터로 내용 수정
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('content')) {
        const contentInput = event.target;
        updateTodoItem(contentInput);
    }
});

document.addEventListener('click', (event) => {
    // 다른 영역 클릭으로 내용 수정
    if (!event.target.classList.contains('content')) {
        const contentInput = document.querySelector('.content');
        //console.log(contentInput);
        if (contentInput && contentInput.value !== '') {
            updateTodoItem(contentInput);
        }
    }

    // 삭제 버튼 눌럿을 때
    if (event.target.classList.contains('delBtn')) {
        const delItem = event.target.parentNode;
        todoData.delete(Number(delItem.id));
        console.log(todoData);
        delItem.remove();
    }

    // 체크박스 기능 사용
    if (event.target.classList.contains('checkbox')) {
        const checkbox = event.target;
        const todoItem = checkbox.parentNode;
        const itemId = Number(todoItem.id);
        const item = todoData.get(itemId);
        item.checked = checkbox.checked ? 'completed' : 'active';
        const contentElement = todoItem.querySelector('.content');
        if (item.checked === 'completed') {
            contentElement.style.textDecoration = 'line-through';
            contentElement.disabled = true;
            checkbox.dataset.checked = 'completed';
        } else {
            contentElement.style.textDecoration = 'none';
            contentElement.disabled = false;
            checkbox.dataset.checked = 'active';
        }
        console.log(todoData);
    }


    // 미리보기 버튼
    if (event.target.classList.contains('show-all-btn') && event.target.classList.contains('selected')) {
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            todoItem.style.display = 'flex';
        });
    }


    // 남은 일 보여주기
    if (event.target.classList.contains('show-active-btn')) {
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            const todoCheck = todoItem.querySelector(".checkbox");
            if(todoItem && todoCheck.dataset.checked === 'active') {
                todoItem.style.display = 'flex';
            } else {
                todoItem.style.display = 'none';
            }
        });
    }


    // 완료한 일 보여주기
    if (event.target.classList.contains('show-completed-btn')) {
        todoData.forEach((_, itemId) => {
            const todoItem = document.getElementById(itemId);
            const todoCheck = todoItem.querySelector(".checkbox");
            if(todoItem && todoCheck.dataset.checked === 'completed') {
                todoItem.style.display = 'flex';
            } else {
                todoItem.style.display = 'none';
            }
        });
    }   


    // 초기화 버튼
    if (event.target.classList.contains('clear-all-btn')) {
        const todoList = document.querySelector('.todo-list');
        todoList.innerHTML = "";
        indexNum = 0;
        todoData.clear();
    }

    checkItems();
});


