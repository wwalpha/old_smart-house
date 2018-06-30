import { handleActions, Action } from 'redux-actions';
import { SAVE_MEDIA } from 'ActionTypes';
import { Chat } from 'models';

const chat = handleActions<Chat.State, Chat.Payload>({
  [SAVE_MEDIA]: (store: Chat.State, action: Action<Chat.Payload>) => store.add(action.payload),

  // tslint:disable-next-line:align
}, Chat.initialState);

export default chat;
