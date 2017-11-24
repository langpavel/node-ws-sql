import { combineReducers } from 'redux';
import clientId from './clientIdReducer';
import connectionState from './connectionStateReducer';
import commands from './commandsReducer';
import commandList from './commandListReducer';

export default combineReducers({
  clientId,
  connectionState,
  commands,
  commandList,
});
