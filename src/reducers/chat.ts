import { handleActions } from 'redux-actions';
import { SAVE_MEDIA } from 'ActionTypes';
import { ChatCLass } from 'models/Chat';
import { State, Payload } from 'models/Chat.d';
import { Action } from 'typings/global';

const initialState: any = new ChatCLass();

const chat = handleActions<State, any>({
  [SAVE_MEDIA]: (state: State, action: Action<Payload.SaveRecordFile>) => state.add(action.payload.media),

  // tslint:disable-next-line:align
}, initialState);

export default chat;
