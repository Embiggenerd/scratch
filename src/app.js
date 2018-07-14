const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { isLoggedIn } = require('./libs/middleware');

const UserService = require('./libs/user');
const pathTo = fileName => path.resolve(__dirname, '..', 'public', fileName);

// const db = { todos: ['buy milk', 'buy clothes'] };

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

app.get('/register', async (req, res) => {
  res.sendFile(pathTo('register.html'));
});

app.post('/register', async (req, res, next) => {
  try {
    const UserCount = await UserServices.countUsers(username);
    if (UserCount > 0)
      return res.json({ error: `${username} is already registered` });
    const savedUser = await UserService.createUser(
      req.body.username,
      req.body.password
    );
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

app.get('/login', (req, res) => {
  res.sendFile(pathTo('login.html'));
});

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = UserService.validateUser(username, password);
    if (validUser) {
      req.session.userId = validUser.id;
      return res.redirect('todos');
    }
    res.redirect('/401');
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
