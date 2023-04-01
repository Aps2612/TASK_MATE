import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/todos', { title });
      console.log(response.data);
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;