import { createReducer, on } from '@ngrx/store';
import { NotificationsCommands } from '../actions/notifications.actions';

export interface FeatureNotificationsState {
  hasErrors: boolean;
  errorMessage?: string;
}

const initialState: FeatureNotificationsState = {
  hasErrors: false,
};

export const reducer = createReducer(
  initialState,
  on(NotificationsCommands.DisplayApiNotification, (s, a) => ({
    hasErrors: true,
    errorMessage: `${a.payload.source}: ${a.payload.message}`,
  }))
);
