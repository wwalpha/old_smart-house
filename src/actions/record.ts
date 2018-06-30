import { createAction } from 'redux-actions';
import {
  SAVE_MEDIA,
} from 'src/constants/ActionTypes';

export const save = createAction(SAVE_MEDIA, (media: any) => media);
