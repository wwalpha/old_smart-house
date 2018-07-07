import { handleActions, Action } from 'redux-actions';
import { SAVE_MEDIA } from 'ActionTypes';
import { ChatCLass } from 'models/Chat';
import { State, Payload } from 'models/Chat.d';

const initialState: any = new ChatCLass();

const chat = handleActions<State, any>({
  [SAVE_MEDIA]: (state: State, action: Action<Payload.SaveRecordFile>) => {
    return action.payload ? state.add(action.payload.media) : state;
  },

  // tslint:disable-next-line:align
}, initialState);

export default chat;
