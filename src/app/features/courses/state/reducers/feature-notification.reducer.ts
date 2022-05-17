import { createReducer } from "@ngrx/store";

export interface FeatureNotificationsState {
  hasErrors: boolean;
  errorMessage?: string;
}

const initialState:FeatureNotificationsState = {
  hasErrors: false
}

export const reducer = createReducer(initialState);
