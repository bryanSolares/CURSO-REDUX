import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUser = createAction(
  '[User] loadUsers',
  props<{ id: string }>()
);
export const loadUserSuccess = createAction(
  '[User] loadUsersSuccess',
  props<{ user: User }>()
);
export const loadUserError = createAction(
  '[User] loadUserError',
  props<{ payload: any }>()
);
