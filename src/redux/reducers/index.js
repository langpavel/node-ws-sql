import { combineReducers } from 'redux';
import clientId from './clientId';
import commands from './commands';
import commandList from './commandList';

export default combineReducers({
  clientId,
  commands,
  commandList,
});
