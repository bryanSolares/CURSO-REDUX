import { createReducer, on } from '@ngrx/store';
import {
  borrar,
  clearCompletados,
  crear,
  editar,
  toggleAllCompletado,
  toggleCompletado,
} from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al Mundo'),
  new Todo('Hacer Cosa A'),
  new Todo('Hacer Cosa B'),
  new Todo('Hacer Cosa C'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggleCompletado, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => {
    return state.filter((todo) => todo.id !== id);
  }),
  on(toggleAllCompletado, (state, { completado }) =>
    state.map((todo) => {
      return { ...todo, completado: completado };
    })
  ),
  on(clearCompletados, (state) => state.filter((todo) => !todo.completado))
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
