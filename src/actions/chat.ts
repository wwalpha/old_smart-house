import { createAction } from 'redux-actions';
import {
  SAVE_MEDIA,
} from 'src/constants/ActionTypes';

export const saveRecordFile = createAction(SAVE_MEDIA, (media: Media) => ({ media }));
