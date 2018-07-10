const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const UserService = require('./services/user');
//const UserModel = require('./models/user');

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

app.get('/api/user', async (req, res) => {
  try {
    const usersList = await UserService.listUsers();
    res.json(usersList);
  } catch (e) {
    next(e);
  }
});

app.post('/api/user', async (req, res, next) => {
  try {
    const savedUser = UserService.createUser(
      req.body.firstName,
      req.body.lastName
    );
    // const user = new UserModel({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName
    // });
    // const savedUser = await user.save();
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'bad request' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
module.exports = app;
