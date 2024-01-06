import { Todo } from '../models/todo.model';
import { createTodoHTML } from './'; 

let elementReference;

/**
 * Renderiza una lista de tareas en el elemento especificado.
 * @param {string} elementId - El ID del elemento HTML donde se van a renderizar las tareas.
 * @param {Todo[]} todos - Lista de tareas a renderizar.
 * @throws {Error} - Si el elemento no se encuentra en el DOM.
 */
export const renderTodos = (elementId, todos = []) => {
  if (!elementReference) {
    elementReference = document.querySelector(elementId);
  }

  if (!elementReference) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Limpiar el contenido anterior en el elemento
  elementReference.innerHTML = '';

  // Renderizar cada tarea en el elemento
  todos.forEach((todo) => {
    const todoElement = createTodoHTML(todo);
    elementReference.appendChild(todoElement);
  });
};
