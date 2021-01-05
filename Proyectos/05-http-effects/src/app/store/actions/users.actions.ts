import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[Users] loadUsers');
export const loadUsersSuccess = createAction(
  '[Users] loadUsersSuccess',
  props<{ users: User[] }>()
);
export const loadUsersError = createAction(
  '[Users] loadUsersError',
  props<{ payload: any }>()
);
