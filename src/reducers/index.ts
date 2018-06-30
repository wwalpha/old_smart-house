import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import chat from './chat';

// import word from './word';

export default combineReducers({
  form: formReducer,
  chat,
});
