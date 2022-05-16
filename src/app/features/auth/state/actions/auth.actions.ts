import { createAction, props } from '@ngrx/store';

export const AuthEvents = {
  loginRequested: createAction(
    '[auth] log in requested',
    props<{ redirectUrl?: string }>()
  ),
  logoutRequested: createAction('[auth] log out requested'),
};

export const AuthCommands = {
  loginUser: createAction(
    '[auth] log in user',
    props<{ userName: string; password: string; redirectUrl?: string }>()
  ),
  logoutUser: createAction('[auth] log out user'),
};

export const AuthDocuments = {
  user: createAction('[auth] user', props<{ payload: string | undefined }>()),
};
