import { createAction, props} from '@ngrx/store';


export const NotificationsEvents = {

};

export const NotificationsCommands = {
    DisplayApiNotification: createAction(
    '[courses] display api error notification',
    props<{ payload: { source: string, message: string}}>()
  )
};

export const NotificationsDocuments = {};

