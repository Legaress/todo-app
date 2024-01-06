import { Todo } from '../todos/models/todo.model';

/**
 * Filtros para las tareas.
 */
const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
};

/**
 * Estado inicial del Store.
 */
const initialState = {
  todos: [
    new Todo('Piedra del Alma'),
    new Todo('Piedra del Tiempo'),
    new Todo('Piedra del Infinito'),
    new Todo('Piedra del Seboruco'),
    new Todo('Piedra del Culo'),
  ],
  filter: Filters.All,
};

/**
 * Inicializa el Store, carga el estado desde el almacenamiento local.
 */
const initStore = () => {
  loadStore();
  console.log('InitStore ☻');
};

/**
 * Carga el estado actual del Store desde el almacenamiento local.
 */
const loadStore = () => {
  const storeState = localStorage.getItem('state');

  if (storeState) {
    const { todos = [], filter = Filters.All } = JSON.parse(storeState);
    state.todos = todos;
    state.filter = filter;
  }
};

/**
 * Guarda el estado actual del Store en el almacenamiento local.
 */
const saveStore = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

/**
 * Obtiene las tareas filtradas según el filtro proporcionado.
 * @param {string} filter - Filtro a aplicar a las tareas.
 * @returns {Todo[]} - Tareas filtradas.
 * @throws {Error} - Si el filtro no es válido.
 */
const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Invalid filter option: ${filter}`);
  }
};

/**
 * Agrega una nueva tarea al estado y guarda los cambios.
 * @param {string} description - Descripción de la tarea a agregar.
 */
const addTodo = (description) => {
  if (!description) {
    throw new Error('Description is required');
  }

  state.todos.push(new Todo(description));
  saveStore();
};

/**
 * Cambia el estado de completitud de una tarea y guarda los cambios.
 * @param {string} id - Identificador de la tarea a cambiar.
 */
const toggleTodo = (id) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, done: !todo.done };
    }
    return todo;
  });

  saveStore();
};

/**
 * Elimina una tarea del estado y guarda los cambios.
 * @param {string} id - Identificador de la tarea a eliminar.
 */
const deleteTodo = (id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
  saveStore();
};

/**
 * Elimina las tareas completadas del estado y guarda los cambios.
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStore();
};

/**
 * Establece el filtro actual.
 * @param {string} newFilter - Nuevo filtro a aplicar.
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
};

/**
 * Obtiene el filtro actual.
 * @returns {string} - Filtro actual.
 */
const getCurrentFilter = () => {
  return state.filter;
};

const state = { ...initialState };

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
