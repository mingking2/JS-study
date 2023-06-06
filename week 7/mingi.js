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


const addTodo = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.keyCode === 13)) {
        event.preventDefault(); // 기본 동작 방지

        const todoInput = document.querySelector('.todo-input').value;
        const todoList = document.querySelector('.todo-list');

        console.log(todoInput);
        if(todoInput.trim() === "") {
            alert("내용이 비엇다");
            return;
        }
        
        // 중복검사 if()




    }
}

enterBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', addTodo);