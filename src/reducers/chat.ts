import { handleActions, Action } from 'redux-actions';
import { SAVE_MEDIA } from 'ActionTypes';
import { ChatCLass } from 'models/Chat';
import { Chat } from 'models';

const initialState: any = new ChatCLass();

const chat = handleActions<Chat.State, any>({
  [SAVE_MEDIA]: (state: Chat.State, action: Action<Chat.Payload.SaveRecordFile>) => {
    return action.payload ? state.add(action.payload.media) : state;
  },

  // tslint:disable-next-line:align
}, initialState);

export default chat;
