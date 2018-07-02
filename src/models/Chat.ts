import { Record, List } from 'immutable';
import { Props } from './Chat.d';
import { Storage } from 'utils/firebase';

export class ChatCLass extends Record<Props>({
  media: List<Media>(),
}) {

  async add(media: Media) {
    console.log(111);
    await Storage.push('1111', media);
    console.log(2222);

    return this.set('media', this.media.push(media));
  }
}
