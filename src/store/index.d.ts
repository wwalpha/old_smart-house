import { Map, Record } from 'immutable';
import { Chat, App } from 'models';

interface IStore {
  chat: Chat.Store,
  app: App.Store,
}

export interface Store extends Map<keyof IStore, Record<any>> {
  get<K extends keyof IStore>(key: K): IStore[K];
}
