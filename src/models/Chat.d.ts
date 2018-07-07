import { Record, List } from 'immutable';

export interface MediaProps {
  filename: string,
  file: Media,
}

export interface Props extends Object {
  media: List<MediaProps>;
}

export module Payload {
  interface SaveRecordFile {
    media?: MediaProps;
  }
}

export interface State extends Record<Props> {
  add: (media?: MediaProps) => State;
}

export interface Store extends Props, State {
  get<K extends keyof Props>(key: K): Props[K];
}
