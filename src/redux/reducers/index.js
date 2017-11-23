import { combineReducers } from 'redux';
import clientId from './clientIdReducer';
import transactionState from './transactionStateReducer';
import commands from './commandsReducer';
import commandList from './commandListReducer';

export default combineReducers({
  clientId,
  transactionState,
  commands,
  commandList,
});
