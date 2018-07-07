import { createAction } from 'redux-actions';
import {
  SAVE_MEDIA,
} from 'src/constants/ActionTypes';
import { MediaProps } from 'models/Chat.d';

export const saveRecordFile = createAction(SAVE_MEDIA, (media: MediaProps) => ({ media }));
