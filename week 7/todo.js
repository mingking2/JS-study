
let indexNum = 0;
export const todoData = new Map();

export const addTodo = (todo) => {
    if (!isDuplicateOrBlank(todo)) return;

    const todoItem = {
        index: ++indexNum,
        content: todo,
        checked: 'active' // 체크박스 유무 초기화
    }

    todoData.set(indexNum, todoItem);    
}


const isDuplicateOrBlank = (todoInput) => {
    if (todoInput.trim() === "") {
        alert("내용이 비엇다");
        return false;
    }

    for (let value of todoData.values()) {
        if (value.content === todoInput) {
            alert("중복이 있다");
            todoInput = "";
            return false;
        }
    }

    return true;
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

export const updateTodo = (itemId) => { // 매개변수를 id로 받아라
    const parentDiv = document.getElementById(itemId);
    const contentInput = parentDiv.querySelector('.content');
    const savedValue = todoData.get(parseInt(itemId)); // Number -> parseInt

    if (isDuplicateOrBlank(contentInput)) {
        if (contentInput.value !== savedValue.content) {
            savedValue.content = contentInput.value; // content 속성만 업데이트
            todoData.set(Number(itemId), savedValue);
        } else {
            contentInput.value = savedValue.content;
            alert('내용이 비었습니다. 원래 데이터로 되돌립니다.');
        }
    }
}

export const toggleTodo = (itemId) => {
    const parentDiv = document.getElementById(itemId);
    const checkbox = parentDiv.querySelector('.checkbox');
    const item = todoData.get(itemId);
    console.log(itemId);
    console.log(item);
    item.checked = checkbox.checked ? 'completed' : 'active';

    const contentElement = parentDiv.querySelector('.content');
    if (item.checked === 'completed') {
        contentElement.style.textDecoration = 'line-through';
        contentElement.disabled = true;
        checkbox.dataset.checked = 'completed';
    } else {
        contentElement.style.textDecoration = 'none';
        contentElement.disabled = false;
        checkbox.dataset.checked = 'active';
    }

}

export const delTodo = (itemId) => {
    const parentDiv = document.getElementById(itemId);
    todoData.delete(itemId);
    console.log(todoData);
    parentDiv.remove();
}

// 엔터로 내용 수정
// document.addEventListener('keydown', (event) => {
//     console.log("event 발생");
//     if (event.key === 'Enter' && event.target.classList.contains('content')) {
//         const itemId = event.target.parentNode.id;
//         console.log(itemId);
//         updateTodo(itemId);
//     }
// });


// document.addEventListener('click', (event) => {
//     // 다른 영역 클릭으로 내용 수정
//     // 비효율적인거 같은디
//     // if (!event.target.classList.contains('content')) {
//     //     const itemId = event.target.parentNode.id;
//     //     //console.log(contentInput);
//     //     if (itemId) {
//     //         updateTodo(itemId);
//     //     }
//     // }

//     // 삭제 버튼 눌럿을 때
//     if (event.target.classList.contains('delBtn')) {
//         const delItem = event.target.parentNode;
//         todoData.delete(Number(delItem.id));
//         console.log(todoData);
//         delItem.remove();
//     }

//     // 체크박스 기능 사용
//     if (event.target.classList.contains('checkbox')) {
//         const itemId = event.target.parentNode.id;
//         toggleTodo(itemId);
//         console.log(todoData);
//     }


//     // 모두 보기 버튼
//     if (event.target.classList.contains('show-all-btn') && event.target.classList.contains('selected')) {
//         todoData.forEach((_, itemId) => {
//             const todoItem = document.getElementById(itemId);
//             todoItem.style.display = 'flex';
//         });
//     }


//     // 남은 일 보여주기
//     if (event.target.classList.contains('show-active-btn')) {
//         todoData.forEach((_, itemId) => {
//             const todoItem = document.getElementById(itemId);
//             const todoCheck = todoItem.querySelector(".checkbox");
//             if (todoItem && todoCheck.dataset.checked === 'active') {
//                 todoItem.style.display = 'flex';
//             } else {
//                 todoItem.style.display = 'none';
//             }
//         });
//     }


//     // 완료한 일 보여주기
//     if (event.target.classList.contains('show-completed-btn')) {
//         todoData.forEach((_, itemId) => {
//             const todoItem = document.getElementById(itemId);
//             const todoCheck = todoItem.querySelector(".checkbox");
//             if (todoItem && todoCheck.dataset.checked === 'completed') {
//                 todoItem.style.display = 'flex';
//             } else {
//                 todoItem.style.display = 'none';
//             }
//         });
//     }


//     // 초기화 버튼
//     if (event.target.classList.contains('clear-all-btn')) {
//         const todoList = document.querySelector('.todo-list');
//         todoList.innerHTML = "";
//         indexNum = 0;
//         todoData.clear();
//     }

//     checkItems();
// });


