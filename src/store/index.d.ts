import { Map, Record } from 'immutable';
import { Chat } from '../models/index.d';

interface IStore {
  chat: Chat.Store,
}

export interface Store extends Map<keyof IStore, Record<any>> {
  get<K extends keyof IStore>(key: K): IStore[K];
}
