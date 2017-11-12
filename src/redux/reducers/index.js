import { combineReducers } from 'redux';
import clientId from './clientId';
import commands from './commands';

export default combineReducers({
  clientId,
  commands,
});
