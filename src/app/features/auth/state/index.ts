import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
export const featureName = 'authFeature';

export interface AuthState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer,
};

const selectFeature = createFeatureSelector<AuthState>(featureName);

const selectAuthBranch = createSelector(selectFeature, (f) => f.auth);

export const selectUserName = createSelector(
  selectAuthBranch,
  (b) => b.userName
);

export const selectUserIsAuthenticated = createSelector(
  selectUserName,
  (n) => !!n
);
