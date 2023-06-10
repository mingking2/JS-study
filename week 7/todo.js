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


export const updateTodo = (itemId) => { // 매개변수를 id로 받아라
    const parentDiv = document.getElementById(itemId);
    const contentInput = parentDiv.querySelector('.content');
    const savedValue = todoData.get(parseInt(itemId)); // Number -> parseInt

    if (isDuplicateOrBlank(contentInput.value)) {
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
    item.checked = checkbox.checked ? 'completed' : 'active';

}

export const delTodo = (itemId) => {
    const parentDiv = document.getElementById(itemId);
    todoData.delete(itemId);
    parentDiv.remove();
}




// document.addEventListener('click', (event) => {
//     
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


