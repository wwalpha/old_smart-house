import { createAction } from 'redux-actions';
import {
  ADD_MESSAGE,
} from 'src/constants/ActionTypes';
import { MediaProps, MsgType } from 'models/Chat.d';

export const addMessage = createAction(ADD_MESSAGE, (type: MsgType, message: MediaProps | string) => ({ type, message }));
