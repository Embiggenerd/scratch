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
    set addTodo(todo) {
      this.todos = [...todos, todo];
    },
    set populateTodos(todos) {
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

  fetch('http://localhost:3000/', {
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
    // const el = elem => {
    //   if (elem.charAt(0) === '#') {
    //     // If passed an ID...
    //     return document.querySelector(elem); // ... returns single element
    //   }
    //   return document.querySelectorAll(elem); // Otherwise, returns a nodelist
    // };

    const ul = document.querySelector('#todos-list');
    const form = document.querySelecto('#todos-form');
    const inputField = document.querySelecto('#todos-field');

    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch('http://localhost:3000/', {
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
