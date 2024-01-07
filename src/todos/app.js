import todoStore from '../store/todo.store';
import appHtml from './app.html?raw';
import { renderTodos } from './use-cases';

// Identificadores de elementos en el DOM
const ElementIDs = {
  ClearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  Filters: '.filters',
};

/**
 * Actualiza la visualización de tareas en la interfaz.
 */
const displayTodos = () => {
  const todos = todoStore.getTodos(todoStore.getCurrentFilter());
  renderTodos(ElementIDs.TodoList, todos);
};

/**
 * Inicializa la aplicación en el elemento HTML especificado.
 * @param {String} elementId - ID del elemento HTML en el que se inicializará la app.
 */
export const App = (elementId) => {
  // Inicializa la aplicación cuando se llama a App
  (() => {
    const appContainer = document.createElement('div');
    appContainer.innerHTML = appHtml;
    document.querySelector(elementId).append(appContainer);
    displayTodos();
  })();

  // Referencias a elementos HTML
  const newTodoInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
  const filtersUL = document.querySelector(ElementIDs.Filters);

  // Escucha el evento 'keyup' para la creación de nuevas tareas
  newTodoInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== '') {
      todoStore.addTodo(event.target.value.trim());
      displayTodos();
      event.target.value = '';
    }
  });

  // Escucha el evento 'click' en la lista de tareas para el cambio de estado o eliminación
  todoListUL.addEventListener('click', (event) => {
    const selectedElement = event.target.closest('[data-id]');

    if (!!selectedElement) {
      if (event.target.className === "toggle") {
        todoStore.toggleTodo(selectedElement.getAttribute('data-id'));
        displayTodos();
      } else if (event.target.className === "destroy") {
        todoStore.deleteTodo(selectedElement.getAttribute('data-id'));
        displayTodos();
      }
    }
  });

  // Escucha el evento 'click' para borrar de la lista los elementos completados
  clearCompletedButton.addEventListener('click',() => {
    todoStore.deleteCompleted();
    displayTodos();
  } )

  // Escucha el evento 'click' para seleccionar el filtro de la lista
  filtersUL.addEventListener('click', (event) => {
    if(event.target.tagName === "A" && !event.target.classList.contains("selected")){
      const selectedItem = filtersUL.querySelector(".selected");
      if(selectedItem){
        selectedItem.classList.remove('selected');
      }

      event.target.classList.add('selected');
      todoStore.setFilter(event.target.id);
      displayTodos();
    }
  })
};
