import { Todo } from '../models/todo.model';

/**
 * Crea un elemento HTML representando una tarea.
 * @param {Todo} todo - La tarea a representar.
 * @returns {HTMLElement} - Elemento HTML que representa la tarea.
 * @throws {Error} - Si no se proporciona un objeto tarea.
 */
export const createTodoHTML = (todo) => {
  if (!todo) {
    throw new Error('A TODO object is required');
  }

  const { id, description, done } = todo;
  const isChecked = done ? 'checked' : '';
  const todoHTML = 
    `<div class="view">
      <input class="toggle" type="checkbox" ${isChecked}>
      <label>${description}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`;

  const todoListItem = document.createElement('li');
  todoListItem.innerHTML = todoHTML;
  todoListItem.setAttribute('data-id', id);
  if (done) {
    todoListItem.classList.add('completed');
  }

  return todoListItem;
};
