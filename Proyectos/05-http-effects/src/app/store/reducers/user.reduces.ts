import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';

import { loadUser } from '../actions';
import { loadUserError } from '../actions';
import { loadUserSuccess } from '../actions';

export interface UserState {
  id: string;
  user: User;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userinitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userinitialState,

  on(loadUser, (state, { id }) => ({ ...state, loading: true, id })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user },
  })),
  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
