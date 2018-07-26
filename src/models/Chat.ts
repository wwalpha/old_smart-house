import { Record, List } from 'immutable';
import { Props, Message, MsgType, MediaProps } from './Chat.d';

export class ChatCLass extends Record<Props>({
  messages: List<Message>(),
}) {

  add(type: MsgType, message: MediaProps | string) {
    console.debug('store.chat.add()');

    return this.set('messages', this.messages.push({
      type, message,
    }));
  }
}
