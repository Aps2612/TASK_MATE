const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  position: { type: Number, default: 0 },
});

module.exports = mongoose.model('Todo', todoSchema);