(function() {
  'use strict';
  /**
   * If first get request is successful, populate todos list by mapping
   * over state.getTodos, appending li to ul.
   * On submission of post request, append returned todo as li to todos ul.
   */

  const state = {
    todos: [],
    get getTodos() {
      return this.todos;
    },
    addTodo(todo) {
      this.todos = [...this.todos, todo];
    },
    populateTodos(todos) {
      this.todos = todos;
    },
    addToList(list, todo) {
      list.insertAdjacentHTML('beforeend', `<li>${todo}</li>`);
    },
    populateList(list, todos) {
      todos.map(todo => {
        list.insertAdjacentHTML('beforeend', `<li>${todo}</li>`);
      });
    }
  };

  const ul = document.querySelector('#todos-list');
  const form = document.querySelector('#todos-form');
  const inputField = document.querySelector('#todos-field');

  fetch('http://localhost:3000/api/todos/', {
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(json => {
        state.populateTodos(json.todos);
        state.populateList(ul, state.getTodos);
        render();
      });
    }
  });

  const render = () => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: inputField.value })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          state.addTodo(json.todo);
          state.addToList(ul, json.todo);
        });
    });
  };
})();
