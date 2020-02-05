const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const todos = require('./data/todos.json');

const app = express();
const port = 4000;

const updateData = (path, newData) => {
  fs.writeFile(path, JSON.stringify(newData), (err) => console.log('error updating data', err));
}

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  res.json(todos);
})

app.get('/todos/random', (req, res) => {
  const random_id = Math.floor(Math.random() * todos.length);

  res.json(todos[random_id]);
})

app.get('/todos/:id', (req, res) => {
  // const todoId = req.params.id == 
  const { id } = req.params;
  const todo = todos.filter(todo => todo.id == id);
  res.json(todo)
})

app.post('/todos', (req, res) => {
  // res.json()
  console.log(req.body);
  const { id, todo } = req.body;
  const todos_id = todos.map((todo) => todo.id);
  const new_todo = { id: (todos_id.length > 0 ? Math.max(...todos_id) : 0) + 1 , todo };
  const new_todos = todos.concat(new_todo)
  // console.log()
  console.log('max? ', Math.max(...todos_id));
  // fs.writeFile('./data/todos.json', JSON.stringify(new_todos), (err) => console.log('error? ', err) );
  updateData('./data/todos.json', new_todos);
  res.json(new_todos);

});

// app.update
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  const old_todo = todos.find(todo => todo.id == id);
  old_todo.todo = todo;
  updateData('./data/todos.json', todos);
  res.json(todos);
}, err => console.log('update error ', err));

// Delete

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const new_todos = todos.filter(todo => todo.id != id);
  updateData('./data/todos.json', new_todos);
  res.json(new_todos);
});

app.listen(port, () => console.log(`Server running at port ${port}`));