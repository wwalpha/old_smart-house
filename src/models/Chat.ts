import { Record, List } from 'immutable';
import { Props, MediaProps } from './Chat.d';

export class ChatCLass extends Record<Props>({
  media: List<MediaProps>(),
}) {

  add(media: MediaProps) {
    console.log(111);
    console.log(media);

    return this.set('media', this.media.push(media));
  }
}
