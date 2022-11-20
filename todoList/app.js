window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#create-todo-item');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        if (e.target.elements.task.value !== '') {
            const todo = {
                task: e.target.elements.task.value,
                done: false,
                createdAt: new Date().getTime()
            }

            todos.push(todo);

            localStorage.setItem('todos', JSON.stringify(todos));
        }
        else {
            alert("Empty task!");
        }

        e.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos() {
    const pendingTodoList = document.querySelector('#todo-list-pending');
    const completedTodoList = document.querySelector('#todo-list-completed');

    pendingTodoList.innerHTML = '';
    completedTodoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const input = document.createElement("input"); //checkbox
        const todoContent = document.createElement("div"); //main content div
        const actions = document.createElement("div"); //buttons div
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;

        todoContent.classList.add('todo-content');
        actions.classList.add('actions');
        editButton.classList.add("edit");
        deleteButton.classList.add("delete");

        todoContent.innerHTML = `<input type="text" value="${todo.task}" readonly>`;
        editButton.innerText = "Edit";
        deleteButton.innerText = "Delete";

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(input);
        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);

        if (todo.done) {
            completedTodoList.appendChild(todoItem);
        }
        else {
            pendingTodoList.appendChild(todoItem);
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add("done");
            }
            else {
                todoItem.classList.remove("done");
            }

            DisplayTodos();
        })

        editButton.addEventListener('click', e => {
            const input = todoContent.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.task = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}