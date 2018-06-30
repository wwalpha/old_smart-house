import { Record } from 'immutable';

export interface Props extends Object {
  media: Media[];
}

export interface State extends Record<Props> {
  add: (payload: Payload) => State;
}

export interface Payload {
  media: Media;
}

export class ChatCLass extends Record<Props>({
  media: [],
}) {

  add(payload: Payload) {
    return this.media.push(payload.media);
  }
}

export const initialState: any = new ChatCLass();
