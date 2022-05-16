import { createReducer, on } from '@ngrx/store';
import { AuthDocuments } from '../actions/auth.actions';

export interface AuthState {
  userName?: string;
}

const initialState: AuthState = {
  // userName: 'Jeff',
};

export const reducer = createReducer(
  initialState,
  on(AuthDocuments.user, (s, a) => ({ ...s, userName: a.payload }))
);
