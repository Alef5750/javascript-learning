function renderTodos(filteredTodos = todos) {
  const tbody = document.querySelector("#todoTable tbody");

  tbody.textContent = "";

  filteredTodos.forEach((todo) => {
    const tr = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = `${todo.id.substr(0, 3)}...`;
    tr.appendChild(idTd);

    const textTd = document.createElement("td");
    textTd.textContent = todo.text;
    if (todo.isDone) {
      textTd.classList.add("done");
    }
    tr.appendChild(textTd);

    const statusTd = document.createElement("td");
    statusTd.textContent = todo.isDone ? "הושלם" : "לא הושלם";
    tr.appendChild(statusTd);

    const actionsTd = document.createElement("td");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = todo.isDone ? "בטל סיום" : "סמן כהושלם";
    toggleButton.onclick = () => toggleDone(todo.id);
    actionsTd.appendChild(toggleButton);

    const editButton = document.createElement("button");
    editButton.textContent = "ערוך";
    editButton.onclick = () => editTodo(todo.id);
    actionsTd.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "מחק";
    deleteButton.onclick = () => deleteTodo(todo.id);
    actionsTd.appendChild(deleteButton);

    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}
