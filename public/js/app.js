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
  render: function(){
    const lis = this.todos
                    .map(todo => `<li>${todo.task}<button class='delete'>x</button></li>`)
                    .join('');
    this.todoList.innerHTML = lis;
    this.cacheDeleteButtons();
    this.bindDeleteEvents();
  }
};

TodoApp.start();
