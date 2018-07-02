import { Record, List } from 'immutable';

export interface Props extends Object {
  media: List<Media>;
}

export module Payload {
  interface SaveRecordFile {
    media?: Media;
  }
}

export interface State extends Record<Props> {
  add: (media?: Media) => State;
}

export interface Store extends Props, State {
  get<K extends keyof Props>(key: K): Props[K];
}
