import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import chat from './chat';
import app from './app';

export default combineReducers({
  form: formReducer,
  chat,
  app,
});
