import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToogleDone}) => {
  /* передаємо "наверх" step D */

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item text-break">
        <TodoListItem 
          {...itemProps } 
          onDeleted={() => onDeleted(id)} 
          // передаємо "наверх" step А
          onToggleImportant={() => onToggleImportant(id)} 
          onToogleDone={() => onToogleDone(id)} 
          />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
