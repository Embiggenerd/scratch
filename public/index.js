(function() {
  const el = elem => {
    if (elem.charAt(0) === '#') {
      // If passed an ID...
      return document.querySelector(elem); // ... returns single element
    }
    return document.querySelectorAll(elem); // Otherwise, returns a nodelist
  };

  const ul = el('#todos-list');
  const form = el('#todos-form');
  const inputField = el('#todos-field');

  fetch('http://localhost:3000/').then(res => {
    if (res.ok) {
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todos: inputField.value })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const li = document.createElement('li');
        li.innerHTML = json.todos;
        ul.appendChild(li);
      });
  });
})();
