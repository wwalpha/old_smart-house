import { handleActions, Action } from 'redux-actions';
import { ADD_MESSAGE } from 'ActionTypes';
import { ChatCLass } from 'models/Chat';
import { Chat } from '@models';

const initialState: any = new ChatCLass();

const chat = handleActions<Chat.State, any>({
  [ADD_MESSAGE]: (state: Chat.State, action: Action<Chat.Payload.AddMessage>) => {
    return action.payload ? state.add(action.payload.type, action.payload && action.payload.message) : state;
  },

  // tslint:disable-next-line:align
}, initialState);

export default chat;
