import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (title, link) => {
    try {
      const response = await axios.post('/api/todos', {
        title,
        link,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const reorderedTodos = [...todos];
    const [removed] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, removed);

    try {
      await axios.patch('/api/todos', {
        todos: reorderedTodos,
      });
      setTodos(reorderedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <AddTodo handleAddTodo={handleAddTodo} />
      <h1>Todo List</h1>
      {todos.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, index) => (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <TodoItem todo={todo} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>No todos found</p>
      )}
    </div>
  );
};

export default TodoList;