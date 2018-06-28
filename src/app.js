const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = { todos: ['buy milk', 'buy clothes'] };

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, '..', 'public', 'index.html'), {
    db: todos
  });
});

app.post('/', (req, res) => {
  // forking data here
  db.todos = [...db.todos, req, body.todo];
  if (db.todos[-1] === req.body.todo) {
    res.json(req.body);
  } else {
    res.status(500).send('Oops, database error');
  }
});

module.exports = app;
