import { Todo } from '../models/todo.model';

/**
 * @param {Todo} todo
 * @returns {HTMLElement}
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error('A TODO object is required');

  const html = `<p>${todo.description} </p>`;
  const liElement = document.createElement('li');
  liElement.innertHTML = html;

  return liElement;
};
