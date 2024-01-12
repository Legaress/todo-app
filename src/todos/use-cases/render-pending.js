import todoStore, {Filters} from '../../store/todo.store';

let elementReference;

/**
 * Renderiza el no.de tareas pendientes en el elemento especificado.
 * @param {string} elementId - El ID del elemento HTML donde se van a renderizar las tareas.
 * @throws {Error} - Si el elemento no se encuentra en el DOM.
 */
export const renderPending = (elementId) => {
	if(!elementReference){
		elementReference = document.querySelector(elementId);
	}

	if (!elementReference) {
    throw new Error(`Element with ID "${elementId}" not found`);
  	}

  	elementReference.innerText = todoStore.getTodos(Filters.Pending).length;
}

