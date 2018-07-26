import { Record, List } from 'immutable';

export type MsgType = "Text" | "Media";

export interface MediaProps {
  filename: string,
  file: Media,
}

export interface Message {
  type: MsgType,
  message: MediaProps | string,
}

export interface Props extends Object {
  messages: List<Message>
}

export module Payload {
  interface AddMessage {
    type: MsgType,
    message: MediaProps | string,
  }
}

export interface State extends Record<Props> {
  add: (type: MsgType, message: MediaProps | string) => State;
}

export interface Store extends Props, State {
  get<K extends keyof Props>(key: K): Props[K];
}
