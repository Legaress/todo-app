import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
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

  //Refercias HTML
  const elementNewTodoInput = document.querySelector(ElementIDs.NewTodoInput);
  const elementTodoListUL= document.querySelector(ElementIDs.TodoList);

  elementNewTodoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== '') {
      todoStore.addTodo(event.target.value.trim());
      displayTodos();
      event.target.value = '';
    }
  });

  elementTodoListUL.addEventListener('click',(event) => {
    const element = event.target.closest('[data-id]');
    const id = element.getAttribute('data-id');
    todoStore.toggleTodo(id);
    displayTodos();
  });


};
