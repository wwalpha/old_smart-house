import { Record, List } from 'immutable';
import { Props } from './Chat.d';
import { S3 } from 'utils/aws';

export class ChatCLass extends Record<Props>({
  media: List<Media>(),
}) {

  async add(media: Media) {
    console.log(111);
    // await S3.put('ttt', '444');
    console.log(media);

    return this.set('media', this.media.push(media));
  }
}
