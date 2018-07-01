import { Record } from 'immutable';
import { Props, Payload } from './Chat.d';

export class ChatCLass extends Record<Props>({
  media: [],
}) {

  add(payload: Payload) {
    return this.media.push(payload.media);
  }
}

export const initialState: any = new ChatCLass();
