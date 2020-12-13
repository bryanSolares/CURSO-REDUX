import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] Crear Todo',
  props<{ texto: string }>()
);

export const toggleCompletado = createAction(
  '[TODO] Cambiar Estado Todo',
  props<{ id: number }>()
);

export const editar = createAction(
  '[TODO] Editar Todo',
  props<{ id: number; texto: string }>()
);

export const borrar = createAction(
  '[TODO] Borrar Todo',
  props<{ id: number }>()
);

export const toggleAllCompletado = createAction(
  '[TODO] Cambiar Todos los Estados Todo',
  props<{ completado: boolean }>()
);

export const clearCompletados = createAction('[TODO] Limpiar Completados');
