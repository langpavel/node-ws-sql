import { combineReducers } from 'redux';
import clientId from './clientIdReducer';
import connectionState from './connectionStateReducer';
import connectionParams from './connectionParamsReducer';
import output from './outputReducer';
import commands from './commandsReducer';
import commandList from './commandListReducer';

export default combineReducers({
  clientId,
  connectionState,
  connectionParams,
  output,
  commands,
  commandList,
});
