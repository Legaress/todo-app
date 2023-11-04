import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: 'todo-list',
};
const displayTodos = () => {
  const todos = todoStore.getTodos(todoStore.getCurrentFilter());
  renderTodos(ElementIDs.TodoList, todos);
};

/**
 * @param {String} elementId
 */
export const App = (elementId) => {
  //Cuando se llama a App
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();
};
