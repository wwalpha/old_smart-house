import { handleActions, Action } from 'redux-actions';
import { SAVE_MEDIA } from 'ActionTypes';
import { ChatCLass } from 'models/Chat';
import { State, Payload } from 'models/Chat.d';

const initialState: any = new ChatCLass();

const chat = handleActions<State, any>({
  [SAVE_MEDIA]: (state: State, action: Action<Payload.SaveRecordFile>) => {
    console.log('SAVE_MEDIA');
    if (!action.payload) return state;
    console.log('123456');

    // window.requestFileSystem()
    return state.add(action.payload.media);
  },

  // tslint:disable-next-line:align
}, initialState);

export default chat;
