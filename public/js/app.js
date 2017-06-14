/*jshint esversion:6*/

const TodoApp = {
  rootElement: '#app',
  todos: [],
  start: function(){
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
    this.createForm = this.root.querySelector('.create-form');
    this.taskInput = this.root.querySelector('.task-input');
    this.todoList = this.root.querySelector('.todo-list');
  },
  bindEvents: function(){
    this.createForm.addEventListener('submit', (event) => {
      this.addTodo(event);
    });
  },
  addTodo: function(event){

    event.preventDefault();
    //grab task input
    const taskValue = this.taskInput.value;
    //validate taskValue
    if (!taskValue) {
      return;
    }
    //build todo object
    const todo = {
      task: taskValue,
      isComplete: false
    };
    //add todo to todos array
    this.todos.push(todo);
    //rerender
    this.render();
    //clear input
    this.taskInput.value = '';
  },
  cacheCheckboxes: function(){
    this.checkboxes = this.root.querySelectorAll('.checkbox');
  },
  setCheckedState: function (){
    this.checkboxes.forEach((box, index)=> {
      const todo = this.todos[index];
      box.checked = todo.isComplete;
    });
  },
  bindCheckboxEvents: function(){
    this.checkboxes.forEach((box, index) => {
      box.addEventListener('click', () => this.strikeTodo(index));
    });
  },
  strikeTodo: function(index){
    const todo = this.todos[index];
    todo.isComplete = !todo.isComplete;
    this.render();
  },
  cacheDeleteButtons: function(){
    this.deleteButtons = this.root.querySelectorAll('.delete');
  },
  bindDeleteEvents: function(){
    this.deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.deleteTodo(index));
    });
  },
  deleteTodo: function(index){
    this.todos.splice(index, 1);
    this.render();
  },
  renderTasks: function(){
    this.todos.map(todo => {
      const lis = document.createElement('li');
      lis.textContent = `${todo.task}`;
      lis.className = 'todo-task';
      this.todoList.appendChild(lis);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      lis.appendChild(deleteButton);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.className = 'checkbox';
      lis.prepend(checkbox);

      if (todo.isComplete === true) {
        lis.style.textDecoration = 'line-through';
        checkbox.setAttribute('checked', 'true');
      }
    });
  },
  render: function(){
    this.todoList.innerHTML = '';
    this.renderTasks();
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
    this.cacheCheckboxes();
    this.setCheckedState();
    this.bindCheckboxEvents();
  }
};

TodoApp.start();
