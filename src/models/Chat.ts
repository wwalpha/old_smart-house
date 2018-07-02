import { Record, List } from 'immutable';
import { Props, Payload } from './Chat.d';

export class ChatCLass extends Record<Props>({
  media: List<Media>(),
}) {

  add(media: Media) {
    return this.set('media', this.media.push(media));
  }
}
