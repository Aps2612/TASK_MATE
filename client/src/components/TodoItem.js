import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo }) => {
  const handleCheck = async (e) => {
    try {
      const response = await axios.patch(`/api/todos/${todo._id}`, {
        completed: e.target.checked,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/todos/${todo._id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <label className={todo.completed ? 'line-through' : ''}>
        <input type="checkbox" checked={todo.completed} onChange={handleCheck} />
        {todo.title}
      </label>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;