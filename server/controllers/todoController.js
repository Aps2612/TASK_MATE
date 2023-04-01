const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ position: 1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed, position } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (typeof completed === 'boolean') {
      todo.completed = completed;
    }
    if (typeof position === 'number') {
      todo.position = position;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.remove();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };