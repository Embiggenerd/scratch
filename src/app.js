const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const todos = ['buy milk', 'buy clothes'];

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, '..', 'public', 'index.ejs'), { todos });
});

app.post('/', (req, res) => {
  // forking data here
  todos.push(req.body.todos);
  res.json(req.body);
});

module.exports = app;
