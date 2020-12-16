import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser } from './auth.actions';
import { unSetUser } from './auth.actions';

export interface State {
  userData: Usuario;
}

export const initialState: State = {
  userData: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, userData: { ...user } })),
  on(unSetUser, (state) => ({ ...state, userData: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
