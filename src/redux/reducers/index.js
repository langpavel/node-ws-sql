import { combineReducers } from 'redux';
import clientId from './clientIdReducer';
import connectionState from './connectionStateReducer';
import connectionParams from './connectionParamsReducer';
import commands from './commandsReducer';
import commandList from './commandListReducer';

export default combineReducers({
  clientId,
  connectionState,
  connectionParams,
  commands,
  commandList,
});
