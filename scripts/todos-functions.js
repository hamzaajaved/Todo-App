// Get Saved ToDos from localStorage
const getSavedToDos = function() {
  let todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//Render application todos based on filters
const renderTodos = function(filters, todos) {
    let filterTodos = todos.filter(function(todo) {
      return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });
  
    filterTodos = filterTodos.filter(function(todo) {
      if (filters.hideCompleted) {
        return !todo.completed;
      } else {
        return true;
      }
    });
  
    const incompleteTodos = filterTodos.filter(function(todo) {
      return !todo.completed;
    });
    
    document.querySelector("#todos").innerHTML = "";
    generateDOMSummary(incompleteTodos);

    if(filterTodos.length > 0){
      filterTodos.forEach(function(todo) {
        generateTodoDOM(todo);
      });
    }else{
      const messageEl = document.createElement("p");
      messageEl.classList.add("empty-message");
      messageEl.textContent = "No to-dos to show";

    }
 
  };

// Save ToDos To localStorage
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo by id
const removeItem = function(id){
  const index = todos.findIndex(function(todo){
    return todo.id === id;
  });

  if(index > -1){
    todos.splice(index,1);
  }
}

//Generate ToDo DOM
const generateTodoDOM = function(todo) {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");
  const checkbox = document.createElement("input");
  const removeButtton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type","checkbox");
  containerEl.appendChild(checkbox);
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change",function(e){
    todo.completed = e.target.checked;
    saveTodos(todos);
    renderTodos(filters, todos);
  })

  // Setup todo text
  if (todo.text.length > 0) {
    todoText.textContent = todo.text + " ";
  } else {
    todoText.textContent = "Un-Named Todo ";
  }
  containerEl.appendChild(todoText);

  
  // Setup Container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  //Set up Remove Button
  removeButtton.textContent = "Remove";
  removeButtton.classList.add("button","button--text");
  todoEl.appendChild(removeButtton);
  removeButtton.addEventListener("click",function(){
    removeItem(todo.id);
    saveTodos(todos);
    renderTodos(filters, todos);
  })



  // Append it to the root element
  document.getElementById("todos").appendChild(todoEl);
};

// Get the DOM elements for list summary
const generateDOMSummary = function(incompleteTodos) {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} Todo${plural} left`;
  document.querySelector("#todos").appendChild(summary);
};


