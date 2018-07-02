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

export interface Store extends Props, State {
  get<K extends keyof Props>(key: K): Props[K];
}