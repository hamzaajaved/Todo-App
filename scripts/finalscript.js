let todos = getSavedToDos();
const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(filters, todos);
document.querySelector("#filter-todo").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(filters, todos);
});

document.querySelector("#todoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = e.target.elements.todoText.value.trim();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text: text,
      completed: false
    });
    saveTodos(todos);
    e.target.elements.todoText.value = "";
    renderTodos(filters, todos);
  }

});

document.querySelector("#hide").addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  renderTodos(filters, todos);
});