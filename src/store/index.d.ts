import { Map, Record } from 'immutable';
import { Chat } from '../models/index.d';

export interface State {
  chat: Chat.State,
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}
