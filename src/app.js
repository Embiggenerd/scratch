const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = { todos: ['buy milk', 'buy clothes'] };

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/todos', (req, res) => {
  res.json({ todos: db.todos });
});

app.post('/api/todos', (req, res) => {
  // forking data here
  db.todos = [...db.todos, req.body.todo];
  if (db.todos[db.todos.length - 1] === req.body.todo) {
    res.json(req.body);
  } else {
    res.status(500).json('Oops, database error');
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'bad request' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
module.exports = app;
