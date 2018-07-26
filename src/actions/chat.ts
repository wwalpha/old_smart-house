import { createAction } from 'redux-actions';
import {
  ADD_MESSAGE,
} from 'src/constants/ActionTypes';
import { MediaProps } from 'models/Chat.d';

export const addMessage = createAction(ADD_MESSAGE, (type: string, message: MediaProps | string) => ({ type, message }));
