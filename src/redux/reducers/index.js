import { combineReducers } from 'redux';
import connectionState from './connectionStateReducer';
import connectionParams from './connectionParamsReducer';
import output from './outputReducer';
import commands from './commandsReducer';

export default combineReducers({
  connectionState,
  connectionParams,
  output,
  commands,
});
