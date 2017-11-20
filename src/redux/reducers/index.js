import { combineReducers } from 'redux';
import clientId from './clientId';
import transactionState from './transactionState';
import commands from './commands';
import commandList from './commandList';

export default combineReducers({
  clientId,
  transactionState,
  commands,
  commandList,
});
